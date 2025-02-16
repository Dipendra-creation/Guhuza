// backend/server.ts

import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

// Configure Multer to store uploaded files in the 'uploads' directory (moved outside the Vite root)
const upload = multer({ dest: '../uploads/' });

// Extend Express Request to include the file property
interface MulterRequest extends express.Request {
  file?: Express.Multer.File;
}

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

// =========================
//  Signup Endpoint
// =========================
app.post('/api/auth/signup', upload.single('image'), async (req: MulterRequest, res) => {
  const { email, username, password, firstName, lastName } = req.body;
  try {
    // Check if a user with the same email exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'A user with that email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine the image path if an image was uploaded
    const imagePath = req.file ? req.file.path : null;

    // Create the user, including the image path if available
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        image: imagePath,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =========================
//  Protected Profile Endpoint
// =========================
app.get('/api/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { scores: true as any, badges: true as any },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// =========================
//  Update Score Endpoint
// =========================
app.put('/api/auth/update-score', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const { level, GP, correctAnswers, wrongAnswers } = req.body;

    // Update the user's score fields.
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        score: GP,                // Store total game points
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
      },
    });

    res.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating score:", error);
    res.status(401).json({ error: 'Invalid token or update failed' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});