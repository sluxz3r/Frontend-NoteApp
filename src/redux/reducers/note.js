const initialState = {
    noteList: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
};

const note = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_NOTE_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GET_NOTE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_NOTE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                noteList: action.payload.data.result
            };

        case 'EDIT_NOTE_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'EDIT_NOTE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'EDIT_NOTE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                noteList: [state.noteList, action.payload.data[0]]
            };

        case 'GET_NOTE_BY_CAT_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GET_NOTE_BY_CAT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_NOTE_BY_CAT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                noteList: action.payload.data.result
            };


        case 'GET_NOTE_BY_ID_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GET_NOTE_BY_ID_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_NOTE_BY_ID_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                noteList: action.payload.data.result
            };


        case 'POST_NOTE_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'POST_NOTE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'POST_NOTE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                noteList: action.payload.data.result
            };

        default:
            return state;
    };

}

export default note