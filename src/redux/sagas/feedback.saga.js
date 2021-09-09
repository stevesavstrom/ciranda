import axios from "axios";
import { takeEvery, put } from "@redux-saga/core/effects";



function* feedbackSaga () {
    yield takeEvery('GET_FEEDBACK', fetchFeedback);
    yield takeEvery('GET_RECYCLING_FEEDBACK', fetchRecyclingFeedback);
    yield takeEvery('POST_RECYCLE_FEEDBACK', postRecyclingFeedback);
}

function* fetchFeedback() {
    try {
        const feedback = yield axios.get('/api/feedback');
        yield put({type:'SET_FEEDBACK', payload:feedback.data});
    } catch (err) {
        console.log('Saga: Error getting feedback data', err);
    }
}

function* fetchRecyclingFeedback() {
    try {
        const feedback = yield axios.get('/api/feedback/recycling_comments');
        yield put({type:'SET_RECYCLING_FEEDBACK', payload:feedback.data});
    } catch (err) {
        console.log('Saga: Error getting recyclingFeedback data', err);
    }
}

function* postRecyclingFeedback(action) {
    console.log('action.payload is:', action.payload);
    try {
        yield axios.post('/api/feedback/recycling_comments', action.payload);
    } catch (err) {
        console.log('Saga: Error adding recycling feedback', err);
    }
}

export default feedbackSaga