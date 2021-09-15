// contains user feedback on recyclers (companies)
const feedbackReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FEEDBACK':
            return action.payload;
        default:
            return state;
    }
}

export default feedbackReducer;