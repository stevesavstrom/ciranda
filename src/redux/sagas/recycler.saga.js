import axios from "axios";
import { takeLatest } from "@redux-saga/core/effects";

function* recyclerSaga() {
    yield takeLatest('ADD_RECYCLER', addRecycler);
  }

function* addRecycler (action) {
    try {
        yield axios.post('/api/location', action.payload);
        // yield put({type:'GET_RECYCLERS'}) -- whatever this is 
    } catch (err) {
        console.log('Saga: Error adding recycler', err);
    }
}

export default recyclerSaga;