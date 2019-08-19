import React, {Component} from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import StopListings from './stopListing';
import StopUpdater from './stopUpdater';
// import for update and post
import './App.css';


const BaseLayout = () => (
  <div className="container-fluid">
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <h2>Bus Stop Information Dashboard</h2>
  <div className="" id="navbarNavAltMarkup">
    <div className="navbar-nav">
        <h4><a className="nav-item nav-link" href="/">Bus Stop List</a></h4>
        <h4><a className="nav-item nav-link" href="/bus_stop/">Change Bus Stops</a></h4>
    </div>
  </div>
</nav>  

    <div className="content">
      <Route path="/" exact component={StopListings} />
      <Route path="/bus_stop/:pk"  component={StopUpdater} />
      <Route path="/bus_stop/" exact component={StopUpdater} />

    </div>

  </div>
);


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout/>
      </BrowserRouter>
    );
  }
}

export default App;
