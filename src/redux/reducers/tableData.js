import * as actionTypes from "../../constants/actionTypes";

const initialState = {
    list: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TABLE_DATA_SUCCESS:
            return {
                ...state,
                list: action.payload,
                loading: false
            }
        case actionTypes.GET_TABLE_DATA_FAILED:
            return {
                ...state,
                loading: false
            }
        case actionTypes.GET_TABLE_DATA_START:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default reducer;