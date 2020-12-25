import axios from 'axios';

export class ApiService {
    constructor(baseURL, token, contentType) {
        const instance = axios.create({
            baseURL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' || contentType,
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': baseURL,
            },
        });

        instance.interceptors.response.use(this.handleSuccess, this.handleError);
        instance.interceptors.request.use((config) => {
            if (!token) return config;

            config.headers['Authorization'] = 'Bearer ' + token;
            return config;
        });

        this.service = instance;
    }

    handleSuccess = response => response;

    handleError = error => Promise.reject(error?.response);

    request(
        method,
        path,
        callback,
        errorCallback,
        payload,
        exectuteWhileLoading,
    ) {
        if (exectuteWhileLoading) exectuteWhileLoading();
        const requestMethod = method.toLowerCase();

        if (requestMethod === 'get' || requestMethod === 'options') {
            return this.service
                .request({
                    method,
                    url: path,
                    responseType: 'json',
                })
                .then(response => callback(response), errorCallback);
        } else {
            return this.service
                .request({
                    method,
                    url: path,
                    responseType: 'json',
                    data: payload,
                })
                .then(response => callback(response?.data), errorCallback);
        }
    }
}
