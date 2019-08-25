import React, {Component} from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import StopConnect from './stopConnect';

const bus_api = new StopConnect();


var makel = (bus_api, callback) =>{
    bus_api.getAllStops().then((res) => {
        return res.data;
    }).then((dats) =>{
        var nodepoint = [];
        dats.forEach((stop) => {
            nodepoint.push({
                'data': { id: stop.stop_id, 'label': stop.name },
                'position': {x: stop.lat, y: stop.lon}
            });
            callback(bus_api, nodepoint);
        })
    });
};



export default class Cytos extends Component{
    state = {
        elements: [],
    }

    componentDidMount() {
        makel(bus_api, (bus_api, nodepoint)=>{
        bus_api.getRoutes().then((res) => {
        return res.data, nodepoint;
        }).then((dats, edges) => {
            dats.forEach((route) =>{
                console.log(route)
                route.forEach((ed) => {
                    edges.push({
                        'data': { source: ed[0], target: ed[1], 'label': 'edge' }
                        });
                    });
                });
            return edges;
            }).then((elem)=>{
            this.setState({
                elements: elem,
            });
        });
        });
    }


    render() {
        console.log(this.state.elements);
        return(
            <CytoscapeComponent elements={this.state.elements} style={ { width: '600px', height: '600px' } } />);
    }
};
