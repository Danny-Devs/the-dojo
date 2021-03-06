import { Link } from 'react-router-dom'

// styles and images
import Temple from '../assets/temple.svg'
import './Navbar.css'

export default function Navbar() {
  return (
    <div className='navbar'>
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>The Dojo</span>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <button className="btn">Logout</button>
        </li>
      </ul>
    </div>
  )
}
