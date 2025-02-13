import React, { useState, useEffect } from "react";
import "../styles/leaderboard.css";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("gp");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    // Simulated fetch call (replace with an actual API request)
    const fetchData = async () => {
      const data = [
        { id: 1, name: "Jitendra Khadka", gp: 1500, badge: "🏆", userId: "JK101", img: "https://via.placeholder.com/50" },
        { id: 2, name: "Dipendra Ojha", gp: 1200, badge: "🥈", userId: "DO102", img: "https://via.placeholder.com/50" },
        { id: 3, name: "Hari Bahadur", gp: 1000, badge: "🥉", userId: "HB103", img: "https://via.placeholder.com/50" },
        { id: 4, name: "Bijay Shrestha", gp: 900, badge: "🎖️", userId: "BS104", img: "https://via.placeholder.com/50" },
        { id: 5, name: "Bhupendra Dangi", gp: 800, badge: "🎖️", userId: "BD105", img: "https://via.placeholder.com/50" },
        { id: 6, name: "Karan Chapai", gp: 750, badge: "🎖️", userId: "KC106", img: "https://via.placeholder.com/50" },
        { id: 7, name: "Anup", gp: 700, badge: "🎖️", userId: "AN107", img: "https://via.placeholder.com/50" },
        { id: 8, name: "Sonam Gaire", gp: 650, badge: "🎖️", userId: "SG108", img: "https://via.placeholder.com/50" },
        { id: 9, name: "Nabin Bohora", gp: 600, badge: "🎖️", userId: "NB109", img: "https://via.placeholder.com/50" },
        { id: 10, name: "Brandon Schock", gp: 500, badge: "🎖️", userId: "BS11", img: "https://via.placeholder.com/50" },
      ];
      setLeaderboardData(data);
    };

    fetchData();
  }, []);

  // Search Filter
  const filteredData = leaderboardData.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting Function
  const sortedData = [...filteredData].sort((a, b) => {
    return sortOrder === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
  });

  return (
    <div className="leaderboard-container">
      <h2>🏆 Guhuza Leaderboard 🏆</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        className="search-input"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Sorting Options */}
      <div className="sorting">
        <label>Sort By: </label>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="gp">Points (GP)</option>
          <option value="name">Name</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? "🔼" : "🔽"}
        </button>
      </div>

      {/* Podium for Top 3 */}
      <div className="podium">
        {sortedData.slice(0, 3).map((player, index) => (
          <div key={player.id} className={`player ${index === 0 ? "first" : index === 1 ? "second" : "third"}`}>
            <img src={player.img} alt={player.name} />
            <p>{player.name}</p>
            <span className="rank">{index + 1}{index === 0 ? "st" : index === 1 ? "nd" : "rd"}</span>
            <span className="gp">{player.gp} GP</span>
          </div>
        ))}
      </div>

      {/* Leaderboard Table */}
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Badges</th>
            <th>User ID</th>
            <th>GP</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((player, index) => (
            <tr key={player.id} className={index < 3 ? "top-three" : ""}>
              <td>{index + 1}</td>
              <td>
                <img src={player.img} alt={player.name} className="player-img" />
                {player.name}
              </td>
              <td>{player.badge}</td>
              <td>{player.userId}</td>
              <td>{player.gp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
