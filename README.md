Guhuza - Interactive Job Quiz Game

📌 Overview

Guhuza is a web-based interactive quiz game that engages users in a job-seeking and hiring process. Players can compete, improve their job-related skills, and progress through various levels while answering multiple-choice questions.

This project is built using React, Vite, Tailwind CSS, Prisma, and Express.js, providing a fast and interactive user experience.

🚀 Features
	•	50 Levels of Challenges – Players answer 10 questions per level to progress.
	•	Scoring System – Earn and lose points based on correct/wrong answers.
	•	Leaderboard – Compete with other players globally.
	•	Profile & Progress Tracking – View game history, completed levels, and total GP (Game Points).
	•	Time-Limited Questions – Answer before the timer runs out.
	•	Dynamic Question Fetching – Questions are retrieved via an API.

🛠 Tech Stack
	•	Frontend: React, Vite, Tailwind CSS, React Router
	•	Backend: Node.js, Express.js
	•	Database: Prisma (PostgreSQL)
	•	Authentication: JSON Web Tokens (JWT)
	•	State Management: React Hooks
	•	Styling: Tailwind CSS, Styled Components

🔧 Installation & Setup

Prerequisites

Ensure you have the following installed:
	•	Node.js (Recommended v18+)
	•	npm or yarn

Clone the Repository

git clone https://github.com/Dipendra-creation/Guhuza.git
cd Guhuza

Install Dependencies

npm install

Set Up Environment Variables

Create a .env file in the root directory and add necessary environment variables such as database credentials, API keys, and JWT secret.

Run the Application

Start Backend Server

npm run start-backend

Start Frontend Development Server

npm run dev

Build for Production

npm run build

Preview the Production Build

npm run preview

📜 API Endpoints

The application fetches questions from an API endpoint. Here’s an example API request:

GET https://api-ghz-v2.azurewebsites.net/api/v2/quiz?level=1

Expected Response:

{
  "test": {
    "test_group": 1,
    "next_test_group": 2,
    "question": [
      {
        "question": "What is the purpose of a job interview?",
        "test_answer": 2,
        "answers": [
          "To socialize with potential employers",
          "To test your knowledge of trivia",
          "To showcase your qualifications and skills"
        ]
      }
    ]
  }
}

⚙️ Project Structure

Guhuza/
│── backend/            # Express backend
│── src/
│   ├── components/     # React components
│   ├── pages/          # Application pages
│   ├── styles/         # SCSS/CSS styles
│   ├── constants.js    # Game constants
│   ├── App.jsx         # Main React Component
│   ├── index.js        # Entry point
│── public/             # Static assets
│── prisma/             # Prisma schema
│── package.json        # Dependencies and scripts
│── vite.config.js      # Vite configuration
│── README.md           # Documentation
│── .gitignore          # Ignored files

🛠 Troubleshooting

If you encounter issues, try the following:
	•	Ensure all dependencies are installed correctly: npm install
	•	If styles are not loading, check TailwindCSS configuration.
	•	If API fetching fails, verify your internet connection or API availability.
	•	Restart the development server after changes: npm run dev

🤝 Contributing

Contributions are welcome! To contribute:
	1.	Fork the repository.
	2.	Create a feature branch: git checkout -b feature-name
	3.	Commit changes: git commit -m "Add feature"
	4.	Push to the branch: git push origin feature-name
	5.	Open a pull request.

📜 License

This project is licensed under the ISC License.

🌟 Acknowledgments

Special thanks to everyone who contributed to this project. If you enjoy using Guhuza, don’t forget to ⭐ this repository!

Would you like me to modify or add anything specific to this README? 😊