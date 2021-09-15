// contains feedback from users on what they've been recycling using the app. 
const recyclingFeedbackReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RECYCLING_FEEDBACK':
            return action.payload;
        default:
            return state;
    }
}

export default recyclingFeedbackReducer;