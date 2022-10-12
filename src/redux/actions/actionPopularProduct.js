import { get, put, deleteMethod } from '../../utilities/https';

export const getAllPopularProducts = () => {
    const url = '/popular/getAll';
    return new Promise((resolve, reject) => {
        const promise = get(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_POPULAR_PRODUCT_LIST',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const addPopularProduct = (body) => {
    const url = `/popular/add`
    return new Promise((resolve, reject) => {
        const promise = put(url, body);
        promise.then((response) => {
            resolve({
                type: 'SAVE_POPULAR_PRODUCT_LIST',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const deletePopularProduct = (productId) => {
    const url = `/popular/delete/${productId}`;
    return new Promise((resolve, reject) => {
        const promise = deleteMethod(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_POPULAR_PRODUCT_LIST',
                payload: response
            })
        }).catch((error) => {
            reject(error);
        })
    })
}
