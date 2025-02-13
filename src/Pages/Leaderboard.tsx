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
          name: "Jitendra Bikram Khadka",
          gp: 1500,
          badge: "🏆",
          
          img: "https://scontent.fyto1-2.fna.fbcdn.net/v/t39.30808-1/458256326_1039419947730235_3090612020628879208_n.jpg?stp=cp6_dst-jpg_s480x480_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_ohc=v8t1rTFf-wYQ7kNvgFBPp6u&_nc_oc=Adi9k4YwOUcDN9qY7N9TFHG_k2hQIOsAmq9OUicnm5KVWFfyd948z1YwJoMFyvmcYLIrL1S1VoRFsjSI6jzob1gm&_nc_zt=24&_nc_ht=scontent.fyto1-2.fna&_nc_gid=AnUVGopSjL-sM_nt9pqx7so&oh=00_AYA3RYBrHLDKNabCGIC_IFuueNTlxYXzlKw1KACy1uezIA&oe=67B357AC",
        },
        {
          id: 2,
          name: "Dipendra Ojha",
          gp: 1200,
          badge: "🥈",
         
          img: "https://scontent.fyto1-2.fna.fbcdn.net/v/t39.30808-1/428699506_1532981613943523_6767113007203117997_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Zhe_Gmpy2qAQ7kNvgEBwIUV&_nc_oc=Adj8gM0W2fUwZpktgO0-TwmdLKfOe837vGjf4dsL6NS68T324df_UNrkdnEw62WJyOuF3i6AV8TZ_o0bDPCVX0Rt&_nc_zt=24&_nc_ht=scontent.fyto1-2.fna&_nc_gid=AmWaPZpHYNrExZDAYpyXRF6&oh=00_AYB5GysFI0PoJwDk3QPqmx60_qJ2pkIZCV2gTu-vMcaZlQ&oe=67B350DF",
        },
        {
          id: 3,
          name: "Hari Adhikari",
          gp: 1000,
          badge: "🥉",
          
          img: "https://scontent.fyto1-2.fna.fbcdn.net/v/t1.6435-9/57486310_2093087700989599_2911754399510429696_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=MB38gfXVhM0Q7kNvgFxMtZj&_nc_oc=Adhamlv_qtP9aQexeTEp1Nl7pOGk8aBcyXbczAYrVCNHISD6TBckC2Yof9YjHqWm5k7kPrLAtDesdjL_b8eT571l&_nc_zt=23&_nc_ht=scontent.fyto1-2.fna&_nc_gid=ApCI7ZyXUwn0S_OyHQhZfbm&oh=00_AYA5uPtrPKufElYGCxGmYbv2k_3YDnNVfvQjU6-WRgLxJg&oe=67D4E60E",
        },
        {
          id: 4,
          name: "Bijay Shrestha",
          gp: 900,
          badge: "🎖️🎖️🎖️",
         
          img: "https://scontent.fykz1-2.fna.fbcdn.net/v/t39.30808-1/461451175_2380604532338151_8572323676717876692_n.jpg?stp=cp6_dst-jpg_s160x160_tt6&_nc_cat=111&ccb=1-7&_nc_sid=fe756c&_nc_ohc=avAnWOM17lcQ7kNvgE_gyqj&_nc_oc=AdjY0vUIO1-VUCmXWyPMg-8yP6FmKm1tbJE3L-3k2a312aJPNROPnzvpwIPxssMrjx8T6h30NWgQ0fxJl48Lo0El&_nc_zt=24&_nc_ht=scontent.fykz1-2.fna&_nc_gid=AOBdoB3_rF023aCJY_m-qwF&oh=00_AYBRtDU6POPN1DDmGQCImdS49mMUOsIRp5Y7MDdOdkFX6g&oe=67B43FD2",
        },
        {
          id: 5,
          name: "Bhupendra Dangi",
          gp: 800,
          badge: "🎖️🎖️🎖️",
          
          img: "https://scontent.fykz1-1.fna.fbcdn.net/v/t39.30808-1/461481345_517129197737741_4082814550569155769_n.jpg?stp=c0.0.1735.1735a_dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_ohc=DLP1stEqPhwQ7kNvgEGXA3C&_nc_oc=Adi57AUpUAszUF_f1tLMxYpdI9s_KTcy1f9jGYxHoJujOJrUhBZO8t2I0m8f84oOdubaAUk2njR-YTAUmuSk3pFk&_nc_zt=24&_nc_ht=scontent.fykz1-1.fna&_nc_gid=A-t7UIcx_TFEyo6M0N3wd8W&oh=00_AYDSmsHfLvVEQ1y3630s6OJzODb_HY7Hw1BT1euLeFPg6g&oe=67B42D69",
        },
        {
          id: 6,
          name: "Karan Chapai",
          gp: 750,
          badge: "🎖️🎖️🎖️",
          
          img: "https://scontent.fykz1-1.fna.fbcdn.net/v/t39.30808-1/475767483_1128162645523040_5932120507518689395_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=nmFnbS3yiBIQ7kNvgHuE89Y&_nc_oc=AdjukTcPsChNqDDo62A6XqndaH5KBF-BPtYsig1ZmtyQ0dGyqXCR4At_ZURXvjrUES4lsXC1VOSkWKcNtxyRcN7-&_nc_zt=24&_nc_ht=scontent.fykz1-1.fna&_nc_gid=ARQpXlGrW-jLEd454lA3sKI&oh=00_AYCVvNwgklo0LHJd3ELS4eRUwJTOakqv3thWk3zmvKmT-Q&oe=67B45564",
        },
        {
          id: 7,
          name: "Anup Aryal",
          gp: 700,
          badge: "🎖️🎖️🎖️",
         
          img: "https://scontent.fykz1-1.fna.fbcdn.net/v/t39.30808-1/422013569_910159384077862_1623954618142889364_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_ohc=PO6OUgFezFYQ7kNvgETTTTN&_nc_oc=AdiStopuNjoEBvDEVHr2f18OyEXF7eqsj5LaJpBUsa6477lvQJ3AuapCqQQO9C1oHMK9xCbka2A4pdPUk3C4CpVl&_nc_zt=24&_nc_ht=scontent.fykz1-1.fna&_nc_gid=Aaw8PMD8rY7FWWqfjLT3bUw&oh=00_AYAYo4s82VqBH3ZVZhZHO9IuRBUMxbijQ4EZ7dCmymA2pA&oe=67B450E3",
        },
        {
          id: 8,
          name: "Sonam Gaire",
          gp: 650,
          badge: "🎖️🎖️🎖️",
         
          img: "https://scontent.fykz1-2.fna.fbcdn.net/v/t39.30808-1/417556986_906617177863685_5432818431277374317_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=R25SB55fx4AQ7kNvgESOVv6&_nc_oc=AdjR7gi1WzhU_MNy1g2Och8lJxC34sv3ZKrCzxLWhNIkFPKDYLirhvoJ2ZAuPgYScDYdOWsrE7H2XqKLYdj9elSE&_nc_zt=24&_nc_ht=scontent.fykz1-2.fna&_nc_gid=AQ0Y44h8ZFVDwhzzTrLWL_7&oh=00_AYAXic7yAHp9zERZ6cR4A7DAFqvGZiCydss-TACV2HqWsQ&oe=67B448D7",
        },
        {
          id: 9,
          name: "Nabin Bohora",
          gp: 600,
          badge: "🎖️🎖️🎖️",
         
          img: "https://scontent.fykz1-1.fna.fbcdn.net/v/t39.30808-1/471225966_122202419756193112_187380517896345396_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=6XgYqtYYxjgQ7kNvgHt5aRF&_nc_oc=AdipCYEsIg8DtKVqNEOyw_Q9pKAbzmq21L8lHIBZGzfltSuturX5U2p6U3rEKA10Kf4kg7F5pCL4ZdJDsnmwLwis&_nc_zt=24&_nc_ht=scontent.fykz1-1.fna&_nc_gid=AHPhLgE1y4iSZB9VoqkWQH2&oh=00_AYCjUZGsNyCdF_jtrW6kaBFov2AEMxJbatNzjQ_OAfnF-g&oe=67B443E3",
        },
        {
          id: 10,
          name: "Brandon Schock",
          gp: 500,
          badge: "🎖️🎖️🎖️",
          img: "https://scontent.fykz1-1.fna.fbcdn.net/v/t39.30808-1/308027064_10160437657148578_2986176872767100768_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=T_YdIYWc86IQ7kNvgE5Ti7i&_nc_oc=AdhU4QR4pAmyM3hmo3w9qNXpYF5_i80wlc_duVVaUh18nm55kO43xpEqZI-DT5mr4Zt_VIR2mDjkNqQDaDpWqsrk&_nc_zt=24&_nc_ht=scontent.fykz1-1.fna&_nc_gid=ADbvkF9eVOC8f7TLtrN7TtN&oh=00_AYAP2Li-ntghv2Z_6p2SOc-GTD4Rga5_rOO7qFPouteLcg&oe=67B42D27",
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
        <td>{player.gp}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default Leaderboard;
