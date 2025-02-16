import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/index.css"; // Import global styles
import Home from "./Pages/Home"; // Import Home page component
import Leaderboard from "./Pages/Leaderboard"; // Import Leaderboard page component
import Play from "./Pages/Play"; // Import Play page component
import AboutGame from "./Pages/AboutGame"; // Import AboutGame page component
import Profile from "./Pages/Profile"; // Import Profile page component
import SignIn from "./components/form/SignInForm"; // Import SignInForm component
import SignUp from "./components/form/SignUpForm"; // Import SignUpForm component
import Navbar from "./components/NavBar/Navbar"; // Import Navbar component

const App: React.FC = () => {
  return (
    <div className="nav-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/play" element={<Play />} />
        <Route path="/aboutgame" element={<AboutGame />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
