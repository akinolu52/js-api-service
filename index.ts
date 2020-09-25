import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance, Method } from 'axios';

export class ApiService {
    private service: AxiosInstance;

    constructor(baseURL: string, token: string) {
        const localService = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': baseURL,
            },
        });

        localService.interceptors.response.use(this.handleSuccess, this.handleError);
        localService.interceptors.request.use((config: AxiosRequestConfig) => {
            if (!token) return config;

            config.headers['Authorization'] = 'Bearer ' + token;
            return config;
        });

        this.service = localService;
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

        if (method === 'GET' || method === 'get') {
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
