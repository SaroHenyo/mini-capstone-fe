const initialState = []

const popularProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_POPULAR_PRODUCT_LIST':
            return state = action.payload;
        default:
            return state;
    }
}

export default popularProductReducer;