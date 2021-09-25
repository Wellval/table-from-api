import axios from 'axios';
import * as actionTypes from '../../constants/actionTypes';

export const requestTableData = () => async dispatch => {
    dispatch({ type: actionTypes.GET_TABLE_DATA_START });
    try {
        const result = await axios.get('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json');
        dispatch({ type: actionTypes.GET_TABLE_DATA_SUCCESS, payload: result.data });
    } catch (e) {
        dispatch({ type: actionTypes.GET_TABLE_DATA_FAILED })
    }
}