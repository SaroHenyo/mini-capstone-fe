import axios from "axios";

function getInstance(url) {
  return axios.create({
    baseURL: url,
    timeout: 120000,
  });
}

// get method for rest api request, just pass the url, access token and body data
export function get(url, body) {
  return new Promise((resolve, reject) => {
    const axiosInstance = getInstance(url);
    axiosInstance({
      method: "get",
      data: body,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log("caught an error :", err.response);
        reject(err);
      });
  });
}

// post method for rest api request, just pass the url, access token and body data
export function post(url, body) {
  return new Promise((resolve, reject) => {
    const axiosInstance = getInstance(url);
    axiosInstance({
      method: "post",
      data: body,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log("caught an error :", err.response);
        reject(err);
      });
  });
}

// put method for rest api request, just pass the url, access token and body data
export function put(url, body) {
  return new Promise((resolve, reject) => {
    const axiosInstance = getInstance(url);
    axiosInstance({
      method: "put",
      data: body,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log("caught an error :", err);
        reject(err);
      });
  });
}

// delete method for rest api request, just pass the url, access token and body data
export function deleteMethod(url, body) {
  return new Promise((resolve, reject) => {
    const axiosInstance = getInstance(url);
    axiosInstance({
      method: "delete",
      data: body,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log("caught an error :", err);
        reject(err);
      });
  });
}
