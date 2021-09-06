import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';

// This component can be used if we do the modal/dialog for details

// RecyclerDetail displays the content shown upon click of "Details" button in SearchItem component. 
function CompanyDetail () {
	const companyDetails = useSelector((store) => store.locationDetailsSaga);

	// const userSearch = useSelector((store) => store.userSearchSaga);

	const {id} = useParams();
	const dispatch = useDispatch();
	
	console.log('Company details reducer:', companyDetails);

	useEffect(() => {
		dispatch({ type: "GET_LOCATION_DETAILS", payload: id });
	}, []);

    return (
		<div>
		<p>Company Details</p>
		<p>{companyDetails && companyDetails[0].name}</p>
		</div>

	)
}

export default CompanyDetail;