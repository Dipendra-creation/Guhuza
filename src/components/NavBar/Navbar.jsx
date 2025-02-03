import './Navbar.css'
import logo_light from '../../assets/logo_w.png'
import logo_dark from '../../assets/logo_b.png'
import toogle_dark from '../../assets/night.png'
import toggle_light from '../../assets/day.png'

const Navbar = () => {
  return (
   <div className='navbar'>
    <img src={logo_light} alt='logo' className='logo'/>
    <ul>
      <li>Home</li>
      <li>Leaderboard</li>
      <li>Play</li>
      <li>About Game</li>
      <li>Profile</li>
    </ul>
    <img src={toggle_light} alt='profile' className='toggle-icon'/>
   </div>
  )
}

export default Navbar