import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:3001/Registration",
});
export const getTenantList = async () => {
  let res = await client.get("?type=tenant");
  return { type: "getTenants", payload: [...res.data] };
};
