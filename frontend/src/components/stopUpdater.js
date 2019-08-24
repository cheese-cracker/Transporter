import React, { Component } from 'react';
import StopConnect from './stopConnect.js';

const bus_api = new StopConnect();

class StopUpdater extends Component {

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.id)
        {
          bus_api.getStop(params.id).then((c)=>{
            this.refs.lat.value = c.lat;
            this.refs.lon.value = c.lon;
            this.refs.name.value = c.name;
            this.refs.entering.value = c.entering;
            this.refs.exiting.value = c.exiting;
          })
        }
      }

    handleCreate = () => {
        bus_api.createStop(
          {
            "stop_id": this.refs.stop_id.value,
            "lat": this.refs.lat.value,
            "lon": this.refs.lon.value,
            "name": this.refs.name.value,
            "entering": this.refs.entering.value,
            "exiting": this.refs.exiting.value,
        }          
        ).then((result)=>{
          alert("New Bus Stop created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
    handleUpdate = (id) => {
        bus_api.updateStop(
          {
            "id": id,
            "stop_id": this.refs.stop_id.value,
            "lat": this.refs.lat.value,
            "lon": this.refs.lon.value,
            "name": this.refs.name.value,
            "entering": this.refs.entering.value,
            "exiting": this.refs.exiting.value,
        }          
        ).then((result)=>{
          alert(`Bus Stop ${result.id} updated!`);
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
    handleSubmit = (event) => {
        const { match: { params } } = this.props;
        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
                StopID: </label>
              <input className="form-control" type="text" ref='stop_id' />

            <label>
                Latitude: </label>
              <input className="form-control" type="text" ref='lat' />

            <label>
                Longitude: </label>
              <input className="form-control" type="text" ref='lon'/>

            <label>
                Stop Name: </label>
              <input className="form-control" type="text" ref='name' />

            <label>
                People Entering: </label>
              <input className="form-control" type="text" ref='entering' />

            <label>
                People Exiting: </label>
              <input className="form-control" type="text" ref='exiting' />


            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }  
};

export default StopUpdater;
