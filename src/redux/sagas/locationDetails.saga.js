import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* editLocationDetailsSaga() {
    yield takeEvery('EDIT_LOCATION_DETAILS', editLocationDetails);
}

function* editLocationDetails() {
	try {
        const response = yield axios.put(`/api/location/${action.payload}`);
        console.log('Inside editLocationDetails: data is', action.payload);
        yield put({ type: 'FETCH_COMPANIES'});
    } catch (error) {
        console.log('Inside editLocationDetails:  Error Editing location details client side', error);
    }
}

// Delete starts here...

function* deleteLocation(action) {
    console.log(action.payload);
    try {
        yield axios.delete('');
        yield put({ type: 'DELETE_LOCATION_DETAILS' ,  });
    } catch (err) {
        console.log("Error deleting details")
    }
}


export default editLocationDetailsSaga;