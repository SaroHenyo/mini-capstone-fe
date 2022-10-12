import { get, put, deleteMethod } from '../../utilities/https';

export const getAllBlogs = () => {
    const url = '/blog/getAll';
    return new Promise((resolve, reject) => {
        const promise = get(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_BLOG_LIST',
                payload: response
            })
        }).catch((error) => {
            reject(error);
        })
    })
}

export const addBlog = (body) => {
    const url = `/blog/add`
    return new Promise((resolve, reject) => {
        const promise = put(url, body);
        promise.then((response) => {
            resolve({
                type: 'SAVE_BLOG_LIST',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const deleteBlog = (blogId) => {
    const url = `/blog/delete/${blogId}`;
    return new Promise((resolve, reject) => {
        const promise = deleteMethod(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_BLOG_LIST',
                payload: response
            })
        }).catch((error) => {
            reject(error);
        })
    })
}