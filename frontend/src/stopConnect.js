import axios from 'axios';

const API_URL = 'http://localhost:8000';


export default class stopsConnect{

    getStop = () => {
        const url = `${API_URL}/api/stops/`;
        return axios.get(url).then((res) => res.data)
    }

    // getStopByURL

    getStopById = (id) => {
        const url = `${API_URL}/api/stops/${id}`;
        return axios.get(url).then((res) => res.data)
    }

    deleteStop = (stop) => {
        const url = `${API_URL}/api/stops/${stop.id}`;
        return axios.delete(url).then((res) => res.data)
    }
    
    createStop = (stop) => {
        const url = `${API_URL}/api/stops/`;
        return axios.post(url, stop).then((res) => res.data)
    }

    updateStop = (stop) => {
        const url = `${API_URL}/api/stops/${stop.id}`;
        return axios.put(url, stop).then((res) => res.data)
    }

}
