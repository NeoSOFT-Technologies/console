# Refresh Token Strategy

After the access token gets expired the user will need to use a new access token , and for that user will need to login again , but this will result into poor user experience. Hence refresh token strategy will help us with getting new access token once it expires . 

<br>
For refresh token strategy we need two tokens after we login <br>
1. access token (lesser lifespan than refresh token)<br>
2. refresh token (greater lifespan than access token)<br>

# Api Factory working


for multiple backend endpoints due to different backend domains import them as follows<br>
```
const defaultHostUrl =
  process.env.REACT_URL || "http://localhost:9999/";
```

to decide between the baseurl of axios call for multiple backend domains.<br>
edit the getDefaultPath function 
```
const getDefaultPath = () => {
  let baseUrl = "";
  const currentURL = window.location.pathname.split("/");

  switch (currentURL[1]) {
    case "login-page":
    case "tenant":
      baseUrl = defaultHostUrl;
      break;
    case "gateway":
      baseUrl = defaultGatewayUrl;
      break;
    default:
      break;
  }
  return baseUrl;
};
```

the transformResponse function will parse the parameter to json .
```const transformResponse = (input: string) => {
  try {
    return JSON.parse(input);
  } catch {
    //  Ignore ;
  }
};
```
the buildHeader function will be used as a header object.
```
const buildHeader = (obj = {}) => {
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  Object.assign(header, obj);
  return header;
};
```

Create new axios instance with builderHeader and baseUrl from getDefaultPath into apiFactory function 
```
const apiFactory = (baseUrl: string = getDefaultPath(), header = {}) => {
  const service = axios.create({
    baseURL: baseUrl,
    headers: buildHeader(header),
    transformResponse: [
      (data) => {
        if (typeof data === "string") {
          return transformResponse(data);
        }
        return data;
      },
    ],
  });
  }
```

We will use axios interceptors to send the access token into the header of axios call .
<br>

In request interceptor we set access token header it uses tokenService to fetch token from localstorage.
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

in response interceptor where we handle error and refresh token strategy.<br>
Below code runs when axios call is successfull and return a proper reponse.
```
service.interceptors.response.use(
    (res) => {
      return res;
    },    
);
```
Below code runs when axios call fails and this block checks if url is not matching /api/login or /api/refresh-access-token , it also check for status code 401 .

``` 
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
        } catch (_error) {
          throw new Error(error(_error));
        }
      }
      throw err;
    }
```

NOTE : - remember to return service at end of apiFactory function.
```
return service;
```
To see complete file [click here]().
