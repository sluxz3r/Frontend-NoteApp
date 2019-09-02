const initialState = {
    idList: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
};

const noteid = (state = initialState, action) => {
    switch (action.type) {
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
                idList: action.payload.data.result
            };
        default:
            return state;
    };

}

export default noteid