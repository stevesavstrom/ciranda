import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* editLocationDetailsSaga() {
    yield takeEvery('EDIT_LOCATION_DETAILS', editLocationDetails);
}

function* editLocationDetails(action) {
	try {
        yield axios.put(`/api/location/${action.id}`, action.payload);
        yield put ( action.renderSearch() );
    } catch (error) {
        console.log('Inside editLocationDetails:  Error Editing location details client side', error);
    }
}

export default editLocationDetailsSaga;