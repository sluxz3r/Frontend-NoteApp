import axios from 'axios';
const url = 'https://note-apps.herokuapp.com'

export const getCat = () => {
    return {
        type: 'GET_CAT',
        payload: axios.get(`${url}/category/`)
    }
};

export const addCat = (data) => {
    return {
        type: 'ADD_CAT',
        payload: axios.post(`${url}/category/`,data)
    }
};
