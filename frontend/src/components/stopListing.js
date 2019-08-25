import React, {Component} from 'react';
// import {Redirect} from 'react-router-dom';
import StopConnect from './stopConnect';

const bus_api = new StopConnect();


export default class StopListings extends Component{
    state = {
        busstops: [],
        nextPageURL: ''
    }

    componentDidMount() {
        bus_api.getStops().then((res) => {
            this.setState({
                busstops: res.data,
                nextPageURL: res.nextlink,
            });
        })
    }

    deleteHandler = (e, stop_id) => {
        bus_api.deleteStop({id: stop_id}).then(() =>{
            var newStopList = this.state.busstops.filter( (stop)=>{
                return stop.id !== stop_id;
            });
            this.setState({busstops: newStopList});
        })
    }

    nextPage = () => {
        var prevLink = this.state.nextPageURL;
        bus_api.getStopsByLink(this.state.nextPageURL).then((res) =>{
            console.log(res.data);
            this.setState({
                busstops: res.data,
                nextPageURL: res.nextlink
            })
        })
    }
    

    render() {
        return (
    <div  className="module-box">
        <div  className="bus-stop-listing">
            <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>#</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Stop Name</th>
                    <th>People Entering</th>
                    <th>People Exiting</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.busstops.map( c  =>
                    <tr  key={c.id}>
                        <td>{c.stop_id}</td>
                        <td>{c.lat}</td>
                        <td>{c.lon}</td>
                        <td>{c.name}</td>
                        <td>{c.entering}</td>
                        <td>{c.exiting}</td>
                        <td>
          <button className="btn btn-sm btn-danger"  onClick={(e)=>  this.deleteHandler(e,c.id) }> Delete</button> 
          <button type="submit" className="btn btn-sm btn-success" onClick={"window.location.pathname = /bus_stop/" + c.id}>Update</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button  className="btn btn-primary"  onClick={this.nextPage}>Next</button>
        </div>
    </div>
        );
    }
};
