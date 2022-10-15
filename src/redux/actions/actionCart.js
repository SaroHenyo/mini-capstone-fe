import { get, put, post } from '../../utilities/https';

export const getAllProductsByUser = (email) => {
    const url = `/cart/getProductByUser/${email}`;
    return new Promise((resolve, reject) => {
        const promise = get(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_CART_PRODUCTS',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const addToCart = (email, productId) => {
    const url = `/cart/${email}/addProduct/${productId}`;
    return new Promise((resolve, reject) => {
        const promise = put(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_CART_PRODUCTS',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const checkOut = (email) => {
    const url = `/cart/checkout/${email}`;
    return new Promise((resolve, reject) => {
        const promise = post(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_CART_PRODUCTS',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}
