// backend/server.ts

import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

// Configure Multer to store uploaded files in the 'uploads' directory (outside the Vite root)
const upload = multer({ dest: '../uploads/' });

// Extend Express Request to include the file property
interface MulterRequest extends express.Request {
  file?: Express.Multer.File;
}

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads folder so images can be accessed via URL
app.use('/uploads', express.static('../uploads'));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

// =========================
//  Signup Endpoint
// =========================
app.post('/api/auth/signup', upload.single('image'), async (req: MulterRequest, res) => {
  const { email, username, password, firstName, lastName } = req.body;
  try {
    // Check if a user with the same email or username exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'A user with that email or username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine the image path if an image was uploaded
    const imagePath = req.file ? req.file.path : null;

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        image: imagePath,
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        highestLevelCompleted: 0,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =========================
//  Login Endpoint
// =========================
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare provided password with stored hash
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =========================
//  Protected Profile Endpoint (with Rank Calculation)
// =========================
app.get('/api/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { 
        userBadges: {
          select: {
            badge: true,
          },
        },
      },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Calculate rank: count how many users have a higher score
    const higherScoreCount = await prisma.user.count({
      where: { score: { gt: user.score } },
    });
    const rank = higherScoreCount + 1;

    res.json({ user: { ...user, rank } });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// =========================
//  Update Profile Picture Endpoint
// =========================
app.post('/api/profile/image', upload.single('profileImage'), async (req: MulterRequest, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Update the user's image field with the new file path and include awarded badges
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { image: req.file.path },
      include: { 
        userBadges: {
          select: {
            badge: true,
          },
        },
      },
    });
    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ error: 'Internal server error updating profile image' });
  }
});

// =========================
//  Update Score & Level Completion Endpoint
// =========================
app.put('/api/auth/update-score', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const { deltaGP, deltaCorrect, deltaWrong, newLevelCompleted } = req.body;

    let dataToUpdate: any = {
      score: { increment: deltaGP },
      correctAnswers: { increment: deltaCorrect },
      wrongAnswers: { increment: deltaWrong },
    };

    if (newLevelCompleted !== undefined) {
      const currentUser = await prisma.user.findUnique({ where: { id: decoded.userId } });
      if (currentUser && newLevelCompleted > currentUser.highestLevelCompleted) {
        dataToUpdate.highestLevelCompleted = newLevelCompleted;
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: dataToUpdate,
    });

    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(401).json({ error: 'Invalid token or update failed' });
  }
});

// =========================
//  Leaderboard Endpoint
// =========================
app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        image: true,
        score: true,
        highestLevelCompleted: true,
        createdAt: true,
        userBadges: {
          select: {
            badge: true,
          },
        },
      },
      orderBy: { score: 'desc' },
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =========================
//  Award Badge Endpoint
// =========================
app.post('/api/auth/award-badge', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const { badgeId } = req.body;
    if (!badgeId) {
      return res.status(400).json({ error: 'Badge ID is required' });
    }

    // Check if the badge exists
    const badge = await prisma.badge.findUnique({ where: { id: badgeId } });
    if (!badge) {
      return res.status(404).json({ error: 'Badge not found' });
    }

    // Check if the user already has this badge
    const existingAward = await prisma.userBadge.findFirst({
      where: { userId: decoded.userId, badgeId },
    });
    if (existingAward) {
      return res.status(400).json({ error: 'Badge already awarded' });
    }

    // Award the badge by creating a record in the UserBadge table
    const awardedBadge = await prisma.userBadge.create({
      data: {
        userId: decoded.userId,
        badgeId: badgeId,
      },
    });

    res.json({ message: 'Badge awarded', awardedBadge });
  } catch (error) {
    console.error("Error awarding badge:", error);
    res.status(401).json({ error: 'Invalid token or award failed' });
  }
});

// =========================
//  Start the Server
// =========================
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});