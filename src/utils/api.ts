import axios from "axios";
import tokenService from "../services/tenant/token.service";
import error from "./error";

const defaultHostUrl =
  process.env.REACT_APP_API_BASEURL || "http://localhost:5000";
const defaultGatewayUrl =
  process.env.REACT_APP_GATEWAY_API || "http://localhost:5501";

// Todo : Make default URL based on Environment ['dev', 'staging', 'test', 'prod']

const getDefaultPath = () => {
  let baseUrl = "";
  const currentURL = window.location.pathname.split("/");
  // console.log(currentURL[1]);
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
const transformResponse = (input: string) => {
  try {
    return JSON.parse(input);
  } catch {
    /* Ignore */
  }
};

const buildHeader = (obj = {}) => {
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  Object.assign(header, obj);
  return header;
};

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

  service.interceptors.response.use(
    (res) => {
      // console.log(" ApiFactory ~ res", res);
      return res;
    },
    async (err) => {
      // console.log(err.config, err);
      const originalConfig = err.config;

      if (
        originalConfig.url !== "/api/login" &&
        err.response && // Access Token was expired
        err.response.status === 401 &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        try {
          const rs = await service.post("/api/refresh-access-token", {
            refreshToken: tokenService.getLocalRefreshToken(),
          });
          const accessToken = rs.data.access_token;
          tokenService.updateLocalAccessToken(accessToken);
          // console.log("inside refresh tooken");
          return service(originalConfig);
        } catch (_error) {
          throw new Error(error(_error));
        }
      }
      throw err;
      // throw axios.isAxiosError(err) && err.response
      //   ? (err as AxiosError)
      //   : (err as Error);
    }
  );

  return service;
};

export default apiFactory;
