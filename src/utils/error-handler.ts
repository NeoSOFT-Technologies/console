import error from "./error";

export default function errorHandler(_error: any) {
  let tmp;
  try {
    tmp = JSON.parse(_error.message);
    if (tmp.config && tmp.config.url.includes("api/refresh-access-token")) {
      tmp = JSON.stringify(tmp.data);
      throw new Error(tmp);
    }
  } catch (__error: any) {
    if (__error.name !== "SyntaxError") {
      throw new Error(tmp);
    }
  }
  return JSON.stringify(error(_error.response.data));
}
