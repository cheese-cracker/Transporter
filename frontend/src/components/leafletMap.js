import React, { Component } from 'react';
import './Leaf.css';
import L from 'leaflet' ;
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import StopConnect from './stopConnect';

var redLeafIcon = L.icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
    shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


const bus_api = new StopConnect();


class LeafMap extends Component{
    state = {
        locations: [],
        zoom: 10.0,
    }

    componentDidMount() {
        bus_api.getStops().then((res)=>{
            var locations = [];
            res.data.forEach((stop) =>{
                locations.push([stop.lat, stop.lon]);
            });
            return locations;
        }).then((loc) => {
            this.setState({
                locations: loc,
            });
        });
    }


  render() {
    var position = this.state.locations[4];
    return (
    <div className="FullMap">
        <Map className="leafMap" center={position} zoom={this.state.zoom}>
            <TileLayer attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {this.state.locations.map(pos =>
            <Marker
                position={pos}
                icon={redLeafIcon}>
            </Marker>
            )}
        </Map>
    </div>
    )
  }
}

export default LeafMap;
