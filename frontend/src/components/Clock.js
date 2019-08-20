import React, { Component } from 'react';

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
        <div className="mod-box">
      <h5 className="white">Time: {this.state.date.toLocaleTimeString()}</h5>
        <h5 className="white">Date: {this.state.date.toLocaleDateString()}</h5>
      </div>
    );
  }
};

export default Clock;
