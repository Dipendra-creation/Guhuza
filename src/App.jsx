import { Route, Routes } from "react-router-dom";
import './styles/index.css'
import Home from "./Pages/Home.jsx";
import Leaderboard from "./Pages/Leaderboard.jsx";
import Play from "./Pages/Play.jsx";
import AboutGame from "./Pages/About game.jsx";
import Profile from "./Pages/Profile.jsx";
import Navbar from "./components/NavBar/Navbar.jsx";



function App() {
  return (
    <div className="nav-container">
       <Navbar/> 
 
      
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="/play" element={<Play/>} />
        <Route path="/aboutgame" element={<AboutGame/>} />
        <Route path="/profile" element={<Profile/>} />
        

        </Routes>

    </div>

    
  );

}

export default App;