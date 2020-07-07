import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return <nav className="navbar">
    <div className="navbar-menu">
      <div className="container">
        <div className="navbar-end">
          <div className="navbar-item">
            <Link to={'/'}>Home</Link>
          </div>
          <div className="navbar-item">
            <Link to={'/past'}>Past Launches</Link>
          </div>
          <div className="navbar-item">
            <Link to={'/upcoming'}>Upcoming Launches</Link>
          </div>
          <div className="navbar-item">
            <a href={'https://www.spacex.com/mars'}>
              <img src={'https://imgur.com/k6mE7pP'} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav >
}

export default NavBar