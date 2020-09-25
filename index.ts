import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance, Method } from 'axios';

export class ApiService {
    private service: AxiosInstance;

    constructor(baseURL: string, token?: string, contentType?: string) {
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
        instance.interceptors.request.use((config: AxiosRequestConfig) => {
            if (!token) return config;

            config.headers['Authorization'] = 'Bearer ' + token;
            return config;
        });

        this.service = instance;
    }

    private handleSuccess = (response: AxiosResponse) => response;

    private handleError = (error: AxiosError) => Promise.reject(error?.response);

    request(
        method: Method,
        path: string,
        callback: any,
        errorCallback: any,
        payload?: AxiosRequestConfig,
        exectuteWhileLoading?: any,
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
                .then((response: { data: AxiosResponse }) => callback(response.data), errorCallback);
        } else {
            return this.service
                .request({
                    method,
                    url: path,
                    responseType: 'json',
                    data: payload,
                })
                .then((response: { data: AxiosResponse }) => callback(response.data), errorCallback);
        }
    }
}
