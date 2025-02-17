import React, { useState, useEffect, ChangeEvent, FC, useMemo } from "react";
import axios from "axios";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ProtectedRoute from "../components/ProtectedRoute";
import "../styles/leaderboard.css";

interface Player {
  id: number;
  name: string;
  gp: number;
  badge: string;
  img: string;
  level: number;   // HighestLevelCompleted
  joined: string;  // CreatedAt date (formatted)
}

type SortBy = "gp" | "name";
type SortOrder = "asc" | "desc";

// Helper function to convert stored image path into an absolute URL.
const getImageUrl = (path: string): string => {
  if (!path) return "";
  const parts = path.split("/");
  const filename = parts[parts.length - 1];
  return `http://localhost:5001/uploads/${filename}`;
};

const Leaderboard: FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>("gp");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/leaderboard");
        // Map the backend user data to the Player interface.
        const players: Player[] = response.data.map((user: any) => {
          const name = user.firstName
            ? `${user.firstName} ${user.lastName || ""}`.trim()
            : user.username;
          const img = user.image ? getImageUrl(user.image) : "";
          return {
            id: user.id,
            name,
            gp: user.score,
            badge: "", // You can add logic here to set badges if needed.
            img,
            level: user.highestLevelCompleted,
            joined: new Date(user.createdAt).toLocaleDateString(),
          };
        });
        setLeaderboardData(players);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter players by search term
  const filteredData = leaderboardData.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Memoized sorting function for performance
  const sortedData = useMemo(() => {
    const data = [...filteredData];
    if (sortBy === "gp") {
      data.sort((a, b) => (sortOrder === "asc" ? a.gp - b.gp : b.gp - a.gp));
    } else if (sortBy === "name") {
      data.sort((a, b) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }
    return data;
  }, [filteredData, sortBy, sortOrder]);

  return (
    <ProtectedRoute>
      <div className="leaderboard-container">
        <h2 className="header-title">🏆 Leaderboard 🏆</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Sorting Options */}
        <div className="sorting">
          <label>Sort By: </label>
          <select onChange={(e) => setSortBy(e.target.value as SortBy)} value={sortBy}>
            <option value="gp">Points (GP)</option>
            <option value="name">Name</option>
          </select>
          <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>

        {/* Podium for Top 3 */}
        <div className="podium">
          {/* Second Place (Left) */}
          <div className="player second">
            <img src={sortedData[1]?.img} alt={sortedData[1]?.name} />
            <p>{sortedData[1]?.name}</p>
            <span className="rank">2nd</span>
            <span className="gp">{sortedData[1]?.gp} GP</span>
          </div>

          {/* First Place (Center) */}
          <div className="player first">
            <img src={sortedData[0]?.img} alt={sortedData[0]?.name} />
            <p>{sortedData[0]?.name}</p>
            <span className="rank">1st</span>
            <span className="gp">{sortedData[0]?.gp} GP</span>
          </div>

          {/* Third Place (Right) */}
          <div className="player third">
            <img src={sortedData[2]?.img} alt={sortedData[2]?.name} />
            <p>{sortedData[2]?.name}</p>
            <span className="rank">3rd</span>
            <span className="gp">{sortedData[2]?.gp} GP</span>
          </div>
        </div>

        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Place</th>
              <th>Name</th>
              <th>Badges</th>
              <th>Level</th>
              <th>Joined</th>
              <th>GP</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((player, index) => (
              <tr key={player.id} className={index < 3 ? "top-three" : ""}>
                <td>{index + 1}</td>
                <td>
                  <div className="player-info">
                    <img src={player.img} alt={player.name} className="player-img" />
                    <span>{player.name}</span>
                  </div>
                </td>
                <td>{player.badge}</td>
                <td>{player.level}</td>
                <td>{player.joined}</td>
                <td>{player.gp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
};

export default Leaderboard;