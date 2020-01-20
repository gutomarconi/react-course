import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-myburger-17eb3.firebaseio.com/"
});

export default instance;
