import axios from 'axios';

const API_URL = 'http://172.17.68.135:8000/api/stops';
const ROUTES_URL = 'http://172.17.68.135:8000/routes_all';


export default class StopConnect{

    getStops = () => {
        const url = API_URL;
        return axios.get(url).then((res) => res.data);
    };
   
    getRoutes = () => {
        const url = ROUTES_URL;
        return axios.get(url).then((res) => res.data);
    };

    getAllStops = () => {
        const url = `${API_URL}_all`;
        return axios.get(url).then((res) => res.data);
    };

    getStopsByLink = (link) => {
        const url = API_URL;
        return axios.get(url).then((res) => res.data);
    };

    getStopById = (id) => {
        const url = `${API_URL}/${id}`;
        return axios.get(url).then((res) => res.data);
    }

    deleteStop = (stop) => {
        const url = `${API_URL}/${stop.id}`;
        return axios.delete(url).then((res) => res.data);
    }
    
    createStop = (stop) => {
        const url = API_URL;
        return axios.post(url, stop).then((res) => res.data);
    }

    updateStop = (stop) => {
        const url = `${API_URL}/${stop.id}`;
        return axios.put(url, stop).then((res) => res.data)
    }

}
