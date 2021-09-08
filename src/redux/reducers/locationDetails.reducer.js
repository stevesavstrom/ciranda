const locationDetails = (state = 0, action) => {
	switch (action.type) {
	  case "SET_LOCATION_DETAILS":
		return action.payload;
	  default:
		return state;
	}
  };
  
  export default locationDetails;