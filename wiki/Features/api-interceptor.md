# Api Interceptor 

Axios interceptors are functions that Axios calls for every request. You can use interceptors to transform the request before Axios sends it, or transform the response before Axios returns the response to your code. You can think of interceptors as Axios' equivalent to middleware in Express or Mongoose

## Usage 

Below code shows a request interceptor .
<br>
This interceptor modifies the config of an axios call and adds Authorization Header with its value.
```
 service.interceptors.request.use(
    (config: any) => {
      const token = tokenService.getLocalAccessToken();
      if (token) {
        config.headers.Authorization = "Bearer " + token; // for Spring Boot back-end
        //  config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (_error) => {
      return _error;
    }
  );
```

Below code shows a response interceptor which handles the responses received from api calls <br>
Particularly in below code the responses are checked for application of refreshtoken strategy.

```
service.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (
        originalConfig.url !== "/api/login" &&
        originalConfig.url !== "/api/refresh-access-token" &&
        err.response && // Access Token was expired
        err.response.status === 401 &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        try {
          const rs = await service.post(
            `${defaultHostUrl}api/refresh-access-token`,
            {
              refreshToken: tokenService.getLocalRefreshToken(),
            }
          );
          const accessToken = rs.data.access_token;
          tokenService.updateLocalAccessToken(accessToken);

          return service(originalConfig);
        } catch (_error: any) {
          throw new Error(JSON.stringify(_error.response));
        }
      }
      throw err;
    }
  );
```