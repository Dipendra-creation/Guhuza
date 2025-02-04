import './Navbar.css'
import logo_dark from '../../assets/logo_b.png'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
   <div className='navbar'>
    <Link to = '/home'>
    <img src={logo_dark} alt='logo' className='logo'/>
    </Link>
    <ul>
      <li><Link to = '/home'>Home</Link></li>
      <li><Link to = '/leaderboard'>Leaderboard</Link></li>
      <li><Link to = '/play'>Play</Link></li>
      <li><Link to = '/abotgame'>About Game</Link></li>
      <li><Link to = '/profile'>Profile</Link></li>
    </ul>

   </div>
  )
}

export default Navbar