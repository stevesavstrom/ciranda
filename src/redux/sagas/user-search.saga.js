import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchCompanies(action) {
  try {
    const searchCompanies = yield axios.get(
      `/api/location/search?state=${action.selectedState}&metalDrums=${action.payload.metalDrums}&plasticDrums=${action.payload.plasticDrums}&plasticFilm=${action.payload.plasticFilm}&cardboard=${action.payload.cardboard}&ibcs=${action.payload.ibcs}&ldpe=${action.payload.ldpe}`
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
