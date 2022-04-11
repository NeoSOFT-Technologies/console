import axios from "axios";
import tokenService from "../services/token.service";

const defaultBaseUrl =
  process.env.REACT_APP_API_BASEURL || "http://localhost:5000";

// Todo : Make default URL based on Environment ['dev', 'staging', 'test', 'prod']

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

const apiFactory = (baseUrl: string = defaultBaseUrl, header = {}) => {
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
    (error) => {
      return error;
    }
  );

  service.interceptors.response.use(
    (res) => {
      console.log(" ApiFactory ~ res", res);
      return res;
    },
    async (err) => {
      console.log(err.config, err);
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

          return service(originalConfig);
        } catch (_error) {
          return _error;
        }
      }

      throw err;
    }
  );

  return service;
};

export default apiFactory;
