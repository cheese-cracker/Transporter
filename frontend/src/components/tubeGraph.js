import React, {Component} from 'react';
import StopConnect from './stopConnect';
import * as d3 from "d3";
import {tubeMap} from "d3-tube-map";
import "d3-tip";
// import tubeData from "./data/tubeData.jsx";


// const bus_api = new StopConnect();

export default class TubeGraph extends Component {
    componentDidMount () {
        this.renderMap();
    }

    renderMap = () => {
        var container = d3.select("#tube_map_101");
        var width = 700;
        var height = 400;

        var map = tubeMap()
        .width(width)
        .height(height)
        .margin({
          top: height / 50,
          right: width / 7,
          bottom: height / 10,
          left: width / 7,
        });

        d3.json("./pubs.json").then(function(data)  {
        container.datum(data).call(map);
        });
    }

    render() {
    
    return (
        <div className="module-box">
            <div id="tube-map">
            </div>
        </div>  
    )};

}
