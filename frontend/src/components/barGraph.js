import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import StopConnect from './stopConnect';


const bus_api = new StopConnect();

var splitter = (info, callback) => {
    var labs = [];
    var enter = [];
    var exit = [];
    info.forEach((stop)=> {
        labs.push(stop.name);
        enter.push(stop.entering);
        exit.push(stop.exiting);
        console.log(labs);
    });
    callback(labs, enter, exit);
};


export default class BarGaph extends Component{
    state = {
        labs: [],
        exit: [],
        enter: [],
    }

    componentDidMount() {
        bus_api.getStops().then((res) => {
            return res.data;
            }).then((dats) => {
                splitter(dats, (labs, enter, exit) => {
                this.setState({
                    labs: labs,
                    enter: enter,
                    exit: exit,
                });
            });
        });
    }

    render() {
    var datas = {
        labels: this.state.labs,
        datasets: [
            {
            label: "Entering Bus Stop",
            backgroundColor: 'rgb(99, 225, 132)',
            borderColor: 'rgb(99, 225, 132)',
            data: this.state.enter,
            },
            {
            label: "Exiting Bus Stop",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: this.state.exit,
            }
        ]
    };
    return (
    <div className="module-box">
        <Bar
          data={datas}
          label="Enter-Exit Chart"
          width={100}
          height={300}
          options={{ maintainAspectRatio: false }}
        />
    </div>  
    );
  }
}
