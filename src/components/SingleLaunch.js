import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class SingleLaunch extends React.Component {

  constructor() {
    super()
    this.state = {
      launch: {

        rocket: {
          second_stage: {
            payloads: []
          }
        },
        launch_site: {},
        links: {}
      }
    }
  }

  componentDidMount() {
    const flightNumber = this.props.match.params.flightNumber
    axios.get(`https://api.spacexdata.com/v3/launches/${flightNumber}`)
      .then(res => this.setState({ launch: res.data }))
  }

  render() {
    const { flight_number, mission_name, launch_date_utc, rocket, launch_site, links, details } = this.state.launch
    // const betterLaunchDateArray = this.state.launch_date_utc.split('')
    // const betterLaunchDate = []
    // for (let i = 0; i < 10; i++) {
    //   betterLaunchDate.push[betterLaunchDateArray[i]]
    // }
    // const joinedBetterLaunchDate = betterLaunchDate.join('')

    return <>
      <div className="single-background">
        <div className="single-launch-body">
          <div className="single-launch-info">
            <h2>Flight number: {flight_number}</h2>
            <h2>Mission name: {mission_name}</h2>
            <h2>Launch date: {launch_date_utc}</h2>
            <h2>Rocket name: {rocket.rocket_name}</h2>
            <div>Nationality: {rocket.second_stage.payloads.map((element) => {
              return element.nationality
            })}</div>
            <div>Manufacturer: {rocket.second_stage.payloads.map((element) => {
              return element.manufacturer
            })}</div>
            <div>Payload type: {rocket.second_stage.payloads.map((element) => {
              return element.payload_type
            })}</div>
            <div>Regime: {rocket.second_stage.payloads.map((element) => {
              return element.orbit_params.regime
            })}</div>
            <h2>Launch site: {launch_site.site_name_long}</h2>
            <img className="single-patch-picture" src={!links.mission_patch_small ? 'https://i.imgur.com/k6mE7pP.png' : links.mission_patch_small} />
            <div>{details}</div>
          </div>
          <div className="rocket-picture-container">
            <img className="rocket-picture" src={rocket.rocket_name === 'Falcon 1' ? 'https://imgur.com/s4lCebI.png' : rocket.rocket_name === 'Falcon 9' ? 'https://imgur.com/ljg2XdF.png' : rocket.rocket_name === 'Falcon Heavy' ? 'https://imgur.com/1A8czD8.png' : links.mission_patch_small} />
          </div>
        </div>
      </div>
    </>
  }
}

export default SingleLaunch