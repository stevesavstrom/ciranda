import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* editLocationDetailsSaga() {
    yield takeEvery('EDIT_LOCATION_DETAILS', editLocationDetails);
}

function* editLocationDetails(action) {
    console.log('Inside editLocationDetails: data is', action.payload);
    console.log('Inside editLocationDetails: id is', action.id);
	try {
        yield axios.put(`/api/location/${action.id}`, action.payload);
        yield put({ type: 'FETCH_COMPANIES'});
    } catch (error) {
        console.log('Inside editLocationDetails:  Error Editing location details client side', error);
    }
}

export default editLocationDetailsSaga;