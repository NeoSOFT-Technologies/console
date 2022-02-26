import { Response } from "miragejs";

export function responseUtils(
  status = 500,
  data = {},
  content = { "Content-Type": "application/json" }
) {
  return new Response(status, content, data);
}
