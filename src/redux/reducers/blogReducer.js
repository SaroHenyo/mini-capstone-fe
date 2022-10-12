const initialState = [];

const blogReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SAVE_BLOG_LIST':
            return state = action.payload;
        default:
            return state;
    }
}

export default blogReducer;