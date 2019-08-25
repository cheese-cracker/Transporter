import React, {Component} from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import StopListings from './components/stopListing';
import StopUpdater from './components/stopUpdater';
// import for update and post
import './App.css';
import Clock from './components/Clock';
import BarGraph from './components/barGraph';
import LeafMap from './components/leafletMap';
import RouteGraph from './components/routeGraph';
import Cytos from './components/cytoGraph';
// import Postit from './components/Postit';


const BusListings = () => (
    <div className="module-bx">
      <Route path="/" exact component={StopListings} />
      <Route path="/bus_stop/:pk"  component={StopUpdater} />
      <Route path="/bus_stop/" exact component={StopUpdater} />
      <Route path="/station_population" exact component={BarGraph} />
      <Route path="/map" exact component={LeafMap} />
      <Route path="/routegraph" exact component={RouteGraph} />
      <Route path="/cytos" exact component={Cytos} />
    </div>
);


class App extends Component {

  render() {
    return (
<div className="App">
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home"><h3>Bus Routes Management Dashboard</h3></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Bus Stop List</Nav.Link>
          <Nav.Link href="/bus_stop/">Add Bus Stop</Nav.Link>
          <Nav.Link href="/station_population/">Bus Stop Population Graph</Nav.Link>
          <Nav.Link href="/map">Bus Stops Map</Nav.Link>
          <Nav.Link href="/routegraph">Route Network</Nav.Link>
          <Nav.Link href="/cytos">Cytos Map</Nav.Link>
        </Nav>
        <Clock />
    </Navbar>
    <div className="content">
     <BrowserRouter>
       <BusListings/>
     </BrowserRouter>
    </div>

    </div>
    );
  } }

export default App;
