// contains the user search results

const userSearch = (state = [], action) => {
    switch (action.type) {
      case 'SET_COMPANIES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default userSearch;
  