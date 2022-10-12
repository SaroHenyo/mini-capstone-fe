const initialState = [];

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SAVE_PRODUCT_LIST':
            return state = action.payload;
        default:
            return state;
    }
}

export default productReducer;