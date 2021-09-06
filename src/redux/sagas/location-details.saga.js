import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* locationDetailsSaga(){
    yield takeEvery('GET_LOCATION_DETAILS', fetchLocationDetails);
}

function* fetchLocationDetails(action) {
    try {
        const response = yield axios.get(`/api/location/${action.payload}`);
        console.log('Inside fetchLocationDetails: data is', response.data);
        yield put({ type: 'SET_LOCATION_DETAILS', payload: response.data});
    } catch (error) {
        console.log('Inside fetchLocationDetails:  Error GETting location details client side', error);
    }
}

export default locationDetailsSaga;