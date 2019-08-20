import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
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
    const datas = {
        labels: ["Stop1", "Stop2", "Stop3", "Stop4", "Stop5", "Stop6", "Stop7"],
        datasets: [
            {
            label: "Entering Bus Stop",
            backgroundColor: 'rgb(99, 225, 132)',
            borderColor: 'rgb(99, 225, 132)',
            data: [20, 10, 35, 2, 20, 10, 0],
            },
            {
            label: "Exiting Bus Stop",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [1, 10, 18, 23, 10, 10, 55],
            }
        ]
    };

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
    <div className="module-box">
        <Bar
          data={datas}
          label="Human Chart"
          width={100}
          height={300}
          options={{ maintainAspectRatio: false }}
        />
    </div>
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
