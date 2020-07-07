import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

class UpcomingLaunches extends React.Component {

  constructor() {
    super()
    this.state = {
      upcomingLaunchesArray: []
    }
  }

  componentDidMount() {
    axios.get('https://api.spacexdata.com/v3/launches/upcoming')
      .then(res => this.setState({ upcomingLaunchesArray: res.data }))
  }

  render() {
    const launchCard = this.state.upcomingLaunchesArray.map((e, i) => (
      <div className="each-card-upcoming" key={i}>
        <Link to={`/${e.flight_number}`}>
          <h2>Mission name: {e.mission_name}</h2>
          <h2>Launch year: {e.launch_year}</h2>
          <img className="patch-picture upcoming-patch" src={!e.links.mission_patch_small ? 'https://imgur.com/k6mE7pP.png' : e.links.mission_patch_small} />
        </Link>
      </div>
    ))
    return <>
      <div className="upcoming-background">
        <p className="upcoming-introduction">
          Here you can explore all of SpaceX's upcoming launches, from now to the future (any new launch announcements from SpaceX will be updated on this page)! Scroll left and right to see all of them! Click on any launch to see additional information!
        </p>
        <div className="upcoming-body">
          {launchCard}
        </div>
      </div>
    </>
  }
}

export default UpcomingLaunches