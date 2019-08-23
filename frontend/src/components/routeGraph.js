import React, {Component} from 'react';
import StopConnect from './stopConnect';
import './routeGraph.css';
// import d3 from 'd3';
var jsnx = require('jsnetworkx');


const bus_api = new StopConnect();


export default class RouteGraph extends Component{
    state = {
        routes: [[[1,2], [2,3], [3,4], [3,1]]],
        names:[]
    }

    componentDidMount() {
    bus_api.getRoutes().then((res) => {
        return res.data;
    }).then((dats) => {
        var G = new jsnx.Graph();
        dats.forEach((route) =>{
            G.addEdgesFrom(route);
        });
        var draw = jsnx.draw(G, {
            element: '#jsnx-graph',
            withLabels: true,
            nodeAttr: {
                r: 10,
                // function(d) {
                // `d` has the properties `node`, `data` and `G`
                // return d.data.count;
              // }
            },
            nodeStyle: {
                fill : '#f00',
            }
        });
    })
}

    render() {
    
    return (
        <div className="module-box">
            <div id="jsnx-graph">
            </div>
        </div>  
    )};
}
