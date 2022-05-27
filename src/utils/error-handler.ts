import error from "./error";

export default function errorHandler(error_: any) {
  let tmp;
  try {
    tmp = JSON.parse(error_.message);
    if (tmp.config && tmp.config.url.includes("api/refresh-access-token")) {
      tmp = JSON.stringify(tmp.data);
      throw new Error(tmp);
    }
  } catch (error__: any) {
    if (error__.name !== "SyntaxError") throw new Error(tmp);
  }
  return JSON.stringify(error(error_.response.data));
}
