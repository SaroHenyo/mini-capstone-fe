import { get, put, deleteMethod } from '../../utilities/https';

export const getAllProducts = () => {
    const url = '/product/getAll';
    return new Promise((resolve, reject) => {
        const promise = get(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_PRODUCT_LIST',
                payload: response
            })
        }).catch((error) => {
            reject(error);
        })
    })
}

export const getProduct = (productId) => {
    const url = `/product/getById/${productId}`;
    return new Promise((resolve, reject) => {
        const promise = get(url);
        promise.then((response) => {
            resolve({
                type: 'GET_ACTIVE_PRODUCT',
                payload: response
            })
        }).catch((error) => {
            reject(error);
        })
    })
}


export const addProduct = (body) => {
    const url = '/product/add';
    return new Promise((resolve, reject) => {
        const promise = put(url, body);
        promise.then((response) => {
            resolve({
                type: 'SAVE_PRODUCT_LIST',
                payload: response
            })
        }).catch((error) => {
            reject(error);
        })
    })
}

export const deleteProduct = (productId) => {
    const url = `/product/delete/${productId}`;
    return new Promise((resolve, reject) => {
        const promise = deleteMethod(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_PRODUCT_LIST',
                payload: response
            })
        }).catch((error) => {
            reject(error);
        })
    })
}