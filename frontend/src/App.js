import React, {Component} from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import StopListings from './components/stopListing';
import StopUpdater from './components/stopUpdater';
// import for update and post
import './App.css';
import Clock from './components/Clock';
// import Postit from './components/Postit';


const BusListings = () => (
    <div className="module-box">
      <Route path="/" exact component={StopListings} />
      <Route path="/bus_stop/:pk"  component={StopUpdater} />
      <Route path="/bus_stop/" exact component={StopUpdater} />
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
  }
}

export default App;
