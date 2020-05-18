### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive
# SPACE X <img src= src/images/spacexlogo.png height=50 width=50 />

## Overview

This is my second project of the Software Engineering Immersive course at GA London. The assignment was to build a React application that consumes a public API. The project was to be completed in teams of 2 within 48 hours.

Making use of Space-X's public API, we built a website that allows the user to see all the past launches that Space-X has done, as well as all the upcoming launches that are planned. 
As the API is being updated when a launch is done, the webpage will be automatically render the launches from upcoming and past launches.

<img src="src/images/Screen Shot 2020-05-13 at 10.40.47.png">

You can see the website on GitHub pages [here](https://iamnini.github.io/project-2/) 

## The Brief 

- **Consume a public API**  – this could be anything but it must make sense for your project.
- **Have several components** - At least one classical and one functional.
- **The app should include a router**  - with several "pages".
- **Be deployed online and accessible to the public.** 

## Technologies Used 

- JavaScript (ES6)
- React.js
- HTML, JSX
- Space-X public API
- SASS
- Webpack
- NPM
- Git and GitHub
- Google Fonts

## The Approach 

As a pair we were both interested in Space-X and their missions to Mars. So we decided to make a launch tracker what will show the upcoming launches and the past launches in order to keep track of SpaceX's activities and plans. 

We decided to use a Open Source REST [API](https://docs.spacexdata.com/?version=latest#5fc4c846-c373-43df-a10a-e9faf80a8b0a) from Space-X that includes images and all the information related to the launches. So we could get a description of each particular mission.

**The Routes with React Router**

So we decided to have 4 main components each one with their own Route.
- `/` - as the Home page, so the landing page.
- `/past` - as the past launches rendered.
- `/upcoming` - as the upcoming launches to be done.
- `/:flightNumber` - a dynamic route that will render an individual launch with its description.

```js
const App = () => (
  <BrowserRouter basename="/project-2">
    <NavBar />
    <Switch>
      <Route exact path="/past" component={PastLaunches} />
      <Route exact path="/upcoming" component={UpcomingLaunches} />
      <Route exact path="/" component={Home} />
      <Route path="/:flightNumber" component={SingleLaunch} />
    </Switch>
  </BrowserRouter>
)
```

- **HOME**

The landing page is no more than rendering two buttons that will take you either to the `/past` path or `/upcoming` path.

```js
        <Link to={'/past'} style={{ fontFamily: 'Special Elite', color: 'black' }}><button>Click here to see past launches</button></Link>
        
        <Link to={'/upcoming'} style={{ fontFamily: 'Special Elite', color: 'black' }}><button>Click here to see upcoming launches</button></Link>

```

 ![](./src/images/home.png)

- **Past Launches**

By using axios that was previously installed and importing the method in order to use a get request into a `componentDidMount()` function we manage to get all the past launches.

The state will be updated as per this request.

```js
class PastLaunches extends React.Component {

  constructor() {
    super()
    this.state = {
      pastLaunchesArray: []
    }
  }

  componentDidMount() {
    axios.get('https://api.spacexdata.com/v3/launches/past')
      .then(res => this.setState({ pastLaunchesArray: res.data }))
  }
```

Rendering the information is done by mapping trough the fetched information after getting it from the API, by mapping we have access to:
- `e.flight_number` - Flight Number
- `e.mission_name` - Mission Name
- `e.launch_year` - Flight date
- `e.links.mission_patch_small` - The patch image for each flight 

All this obtained information is returned in the form of a card, so users are able to go trough all the missions by scrolling left and right.

```js
render() {
    const launchCard = this.state.pastLaunchesArray.map((e, i) => (
      <div className="each-card-past" key={i}>
        <Link to={`/${e.flight_number}`}>
          <h2>Mission name: {e.mission_name}</h2>
          <h2>Launch year: {e.launch_year}</h2>
          <img className="patch-picture" src={e.links.mission_patch_small} />
        </Link>
      </div>
    ))
    return <>
      <div className="past-background">
        <p className="past-introduction">
          Here you can explore all of SpaceX's past launches, from 2006 to the present! Scroll left and right to see all of them! Click on any launch to see additional information!
        </p>
        <div className="past-body">
          {launchCard}
        </div>
      </div>
    </>
  }
}
```

 ![](./src/images/past.png)


 - **Upcoming Launches**

The upcoming launches were done in a similar manner as the past ones, by using an axios method but this time the get request is done to a different api url with our `componentDidMount()` function.

```js
 componentDidMount() {
    axios.get('https://api.spacexdata.com/v3/launches/upcoming')
      .then(res => this.setState({ upcomingLaunchesArray: res.data }))
  }
```

Rendering and returning the elements was done in the same way as our past launches, with the only difference that most of the upcoming launches did not have an image patch to render, which is where we faced the problem that our cards were missing an image.

The solution we found was adding an image ourselves each time that the API did not provide one, so we decided to render a Space-X logo instead.

<img src= src/images/spacexlogo.png height=50 width=50 />

```js
  <img className="patch-picture upcoming-patch" src={!e.links.mission_patch_small ? '../images/spacexlogo.png' : e.links.mission_patch_small} />

```

![](./src/images/upcoming.png)

 - **Single Launch**

 In order to build an interactive single launch path so that when we click in a card this particular information will be rendered we used the `flightNumber` as it is a unique identifier for each launch.

 ```js

     const flightNumber = this.props.match.params.flightNumber

   componentDidMount() {
    const flightNumber = this.props.match.params.flightNumber
    axios.get(`https://api.spacexdata.com/v3/launches/${flightNumber}`)
      .then(res => this.setState({ launch: res.data }))
  }

 ```

This time the state will contain more than one property, this is due to the API structure as in order to get the additional information we had to map trough some arrays that where contained inside objects.


```js
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
```

We decided to add pictures of the rockets used in the single card. The rocket pictures, since they were not included in the API, as a different mission had a different rocket, we matched the `rocket_name` from the API with our stored pictures.


```js
            <img className="rocket-picture" src={rocket.rocket_name === 'Falcon 1' ? '../images/falcon1.png' : rocket.rocket_name === 'Falcon 9' ? '../images/falcon9.png' : rocket.rocket_name === 'Falcon Heavy' ? '../images/falconheavy.png' : links.mission_patch_small} />

```


![](./src/images/single.png)


## Potential Future Features

- A search field is a potential future feature for this project as we might want to search for one particular launch information.

## Challenges 

- Depending on the structure of the API, it can be quite tedious to get all the information that you want. So understading the API in the first place was a challenge as we were not rendering what we wanted from the really beginning. A lesson learned from this project will be to reasearch the API we want to use first.

- Deploying React Router on GitHub pages was also quite difficult, as many adjustments were needed to move from the dev-server. For instance, some images are visible in the localhost but not yet into the live page. This is an issue we are working on fixing.