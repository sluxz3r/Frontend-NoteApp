import axios from 'axios';
const url = 'https://note-apps.herokuapp.com'

export const getNote = () => {
    return {
        type: 'GET_NOTE',
        payload: axios.get(`${url}/cat/`,)
    }
};

export const getNoteByCat = (id_note) => {
    return {
        type: 'GET_NOTE_BY_CAT',
        payload: axios.get(`${url}/cat/${id_note}`)
    }
};

export const getNoteById = (id) => {
    return {
        type: 'GET_NOTE_BY_ID',
        payload: axios.get(`${url}/${id}`)
    }
};


export const postNote = (data) => {
    return {
        type: 'POST_NOTE',
        payload: axios.post(`${url}/`, data)
    }
};

export const editNote = (data, id) => {
    return {
        type: 'EDIT_NOTE',
        payload: axios.patch(`${url}/${id}`, data)
    }
};


