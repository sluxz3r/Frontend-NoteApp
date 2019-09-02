import axios from 'axios';
const url = 'https://note-apps.herokuapp.com'

export const getNoteById = (id) => {
    return {
        type: 'GET_NOTE_BY_ID',
        payload: axios.get(`${url}/${id}`)
    }
};


