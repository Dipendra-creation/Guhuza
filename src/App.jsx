import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Leaderboard from "./Pages/Leaderboard";
import Play from "./Pages/Play";
import AboutGame from "./Pages/About game";
import Profile from "./Pages/Profile";
import Navbar from "./components/NavBar/Navbar";



function App() {
  return (
    <div className=" overflow-x-hidden w-full h-screen">
      { <Navbar/> }
      
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="/play" element={<Play/>} />
        <Route path="/AboutGame" element={<AboutGame/>} />
        <Route path="/profile" element={<Profile/>} />
        

        </Routes>

    </div>

    
  );

}

export default App;