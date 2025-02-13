import React, {
  useState,
  useEffect,
  ChangeEvent,
  FC,
  useMemo,
} from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "../styles/leaderboard.css";

interface Player {
  id: number;
  name: string;
  gp: number;
  badge: string;
  userId: string;
  img: string;
}

type SortBy = "gp" | "name";
type SortOrder = "asc" | "desc";

const Leaderboard: FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>("gp");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  useEffect(() => {
    // Simulated fetch call (replace with an actual API request)
    const fetchData = async () => {
      const data: Player[] = [
        {
          id: 1,
          name: "Jitendra Khadka",
          gp: 1500,
          badge: "🏆",
          userId: "JK101",
          img: "https://scontent.fyto1-2.fna.fbcdn.net/v/t39.30808-1/458256326_1039419947730235_3090612020628879208_n.jpg?stp=cp6_dst-jpg_s480x480_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_ohc=v8t1rTFf-wYQ7kNvgFBPp6u&_nc_oc=Adi9k4YwOUcDN9qY7N9TFHG_k2hQIOsAmq9OUicnm5KVWFfyd948z1YwJoMFyvmcYLIrL1S1VoRFsjSI6jzob1gm&_nc_zt=24&_nc_ht=scontent.fyto1-2.fna&_nc_gid=AnUVGopSjL-sM_nt9pqx7so&oh=00_AYA3RYBrHLDKNabCGIC_IFuueNTlxYXzlKw1KACy1uezIA&oe=67B357AC",
        },
        {
          id: 2,
          name: "Dipendra Ojha",
          gp: 1200,
          badge: "🥈",
          userId: "DO102",
          img: "https://scontent.fyto1-2.fna.fbcdn.net/v/t39.30808-1/428699506_1532981613943523_6767113007203117997_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Zhe_Gmpy2qAQ7kNvgEBwIUV&_nc_oc=Adj8gM0W2fUwZpktgO0-TwmdLKfOe837vGjf4dsL6NS68T324df_UNrkdnEw62WJyOuF3i6AV8TZ_o0bDPCVX0Rt&_nc_zt=24&_nc_ht=scontent.fyto1-2.fna&_nc_gid=AmWaPZpHYNrExZDAYpyXRF6&oh=00_AYB5GysFI0PoJwDk3QPqmx60_qJ2pkIZCV2gTu-vMcaZlQ&oe=67B350DF",
        },
        {
          id: 3,
          name: "Hari Bahadur",
          gp: 1000,
          badge: "🥉",
          userId: "HB103",
          img: "https://scontent.fyto1-2.fna.fbcdn.net/v/t1.6435-9/57486310_2093087700989599_2911754399510429696_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=MB38gfXVhM0Q7kNvgFxMtZj&_nc_oc=Adhamlv_qtP9aQexeTEp1Nl7pOGk8aBcyXbczAYrVCNHISD6TBckC2Yof9YjHqWm5k7kPrLAtDesdjL_b8eT571l&_nc_zt=23&_nc_ht=scontent.fyto1-2.fna&_nc_gid=ApCI7ZyXUwn0S_OyHQhZfbm&oh=00_AYA5uPtrPKufElYGCxGmYbv2k_3YDnNVfvQjU6-WRgLxJg&oe=67D4E60E",
        },
        {
          id: 4,
          name: "Bijay Shrestha",
          gp: 900,
          badge: "🎖️",
          userId: "BS104",
          img: "https://via.placeholder.com/50",
        },
        {
          id: 5,
          name: "Bhupendra Dangi",
          gp: 800,
          badge: "🎖️",
          userId: "BD105",
          img: "https://via.placeholder.com/50",
        },
        {
          id: 6,
          name: "Karan Chapai",
          gp: 750,
          badge: "🎖️",
          userId: "KC106",
          img: "https://via.placeholder.com/50",
        },
        {
          id: 7,
          name: "Anup",
          gp: 700,
          badge: "🎖️",
          userId: "AN107",
          img: "https://via.placeholder.com/50",
        },
        {
          id: 8,
          name: "Sonam Gaire",
          gp: 650,
          badge: "🎖️",
          userId: "SG108",
          img: "https://via.placeholder.com/50",
        },
        {
          id: 9,
          name: "Nabin Bohora",
          gp: 600,
          badge: "🎖️",
          userId: "NB109",
          img: "https://via.placeholder.com/50",
        },
        {
          id: 10,
          name: "Brandon Schock",
          gp: 500,
          badge: "🎖️",
          userId: "BS11",
          img: "https://via.placeholder.com/50",
        },
      ];
      setLeaderboardData(data);
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
      data.sort((a, b) =>
        sortOrder === "asc" ? a.gp - b.gp : b.gp - a.gp
      );
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
        <select
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          value={sortBy}
        >
          <option value="gp">Points (GP)</option>
          <option value="name">Name</option>
        </select>
        <button
          onClick={() =>
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
          }
        >
          {sortOrder === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>

      {/* Podium for Top 3 */}
      <div className="podium">
        {sortedData.slice(0, 3).map((player, index) => (
          <div
            key={player.id}
            className={`player ${
              index === 0 ? "first" : index === 1 ? "second" : "third"
            }`}
          >
            <img src={player.img} alt={player.name} />
            <p>{player.name}</p>
            <span className="rank">
              {index + 1}
              {index === 0 ? "st" : index === 1 ? "nd" : "rd"}
            </span>
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
            <th>GP</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((player, index) => (
            <tr
              key={player.id}
              className={index < 3 ? "top-three" : ""}
            >
              <td>{index + 1}</td>
              <td>
                <img
                  src={player.img}
                  alt={player.name}
                  className="player-img"
                />
                {player.name}
              </td>
              <td>{player.badge}</td>
              <td>{player.gp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
