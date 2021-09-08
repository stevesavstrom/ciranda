import axios from "axios";
import { takeLatest } from "@redux-saga/core/effects";

function* companyFeedbackSaga() {
    yield takeLatest('ADD_COMPANY_FEEDBACK', companyFeedback);
  }

function* companyFeedback (action) {
    console.log(action.payload);
    try {
        yield axios.post('/api/feedback', action.payload);
    } catch (err) {
        console.log('Saga: Error adding company feedback', err);
    }
}

export default companyFeedbackSaga;