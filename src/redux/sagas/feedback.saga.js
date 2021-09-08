import axios from "axios";
import { takeEvery, put } from "@redux-saga/core/effects";



function* feedbackSaga () {
    yield takeEvery('GET_FEEDBACK', fetchFeedback);
}

function* fetchFeedback() {
    try {
        const feedback = yield axios.get('/api/feedback');
        yield put({type:'SET_FEEDBACK', payload:feedback.data});
    } catch (err) {
        console.log('Saga: Error getting feedback data', err);
    }
}

export default feedbackSaga