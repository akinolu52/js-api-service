# js-api-service

A simple way to make API request from the client end

## Installation

Use the package manager [npm](https://nodejs.org/en/download/) to install js-api-service.

```bash
npm install js-api-service
```

## Usage

```javascript
import { ApiService } from 'js-api-service';

***Example:***

const userApiService = ApiService('https://jsonplaceholder.typicode.com');
const userApiService = ApiService('https://jsonplaceholder.typicode.com', 'Bearer **token**');

ApiService.request(method, path, callback, errorCallback, payload, exectuteWhileLoading);

1. method: this is any of the HTTP request method - get, delete, head, options, posst, put, patch,
purge, link, unlink
2. path: this is the relative path to the needed resource - '/user'
3. callback: this is a function that gets executed when the request is successful - (response) => console.log('response from API -> ', response)  
4. errorCallback: this is a error function that gets executed when the request fails - (error) => console.log('error from API -> ', error)  
5. payload (optional): this is an object that needs you to send data to the API - { key: value }
6. exectuteWhileLoading (optional): this is a function that gets executed while the request is loading - NB: you can show a toast or upload progress

***Usage***
ApiService.request(
    'post', 
    '/auth',
    response => {
        console.log(response);
        return response;
    },
    error => {
        console.log(error);
        return error;
    },
    { username: 'user', password: 'user' },
    console.log('Login you into your account...'),
);


```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[GNU](https://www.gnu.org/licenses)