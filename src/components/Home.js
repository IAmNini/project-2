import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

const Home = () => {
  return <>
    <div className="home-body">
      <h1>Welcome to Space!</h1>
      <p className="home-intro">
        Here you can find all of SpaceX's launches from past and future missions! You can get more information if you visit the specific pages!
      </p>
      <div>
        <button><Link to={'/past'} style={{ fontFamily: 'Special Elite', color: 'black' }}>Click here to see past launches</Link></button>
        <button><Link to={'/upcoming'} style={{ fontFamily: 'Special Elite', color: 'black' }}>Click here to see upcoming launches</Link></button>
      </div>
      <h2>BECOMING A MULTIPLANET SPECIES</h2>
    </div>
  </>
}

export default Home