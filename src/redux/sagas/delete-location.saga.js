import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteLocationSaga () {
    yield takeEvery('DELETE_LOCATION', deleteLocation);
}

function* deleteLocation (action) {
    try {
        yield call(axios.delete, `/api/location/${action.payload}`);
        console.log(`DELETE payload`, action.payload);
        // yield put({ type: 'FETCH_COMPANIES' });
		yield put ( action.renderSearch() );
    } catch(error){
        console.log(`Problem DELETING company`, error);
    }
}

export default deleteLocationSaga;