import { Route, Routes } from "react-router-dom";
import './styles/index.css'
import Home from "./Pages/Home";
import Leaderboard from "./Pages/Leaderboard";
import Play from "./Pages/Play";
import AboutGame from "./Pages/About game";
import Profile from "./Pages/Profile";
import Navbar from "./components/NavBar/Navbar";



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