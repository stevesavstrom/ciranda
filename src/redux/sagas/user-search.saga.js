import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchCompanies(action) {
  console.log('This is payload from SAGA', action.payload);
  console.log('This is selected state from SAGA', action.selectedState);

  try {
    const searchCompanies = yield axios.get(
      `/api/location/search?state=${action.selectedState}&metalDrums=${action.payload.metalDrums}&plasticDrums=${action.payload.plasticDrums}&plasticFilm=${action.payload.plasticFilm}&cardboard=${action.payload.cardboard}&ibcs=${action.payload.ibcs}`
    );
    yield put({ type: "SET_COMPANIES", payload: searchCompanies.data });
  } catch (error) {
    console.log("Inside fetchCompanies, unable to return companies", error);
  }
}

function* userSearchSaga() {
  yield takeLatest("FETCH_COMPANIES", fetchCompanies);
}

export default userSearchSaga;
