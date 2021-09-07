
const feedbackReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FEEDBACK':
            return action.payload;
        default:
            return state;
    }
}

    // library will be on the redux state at:
    // state.feedback

export default feedbackReducer;