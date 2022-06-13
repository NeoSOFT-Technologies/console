import error from "./error";

test("calling the function of error", () => {
  try {
    throw new Error(`{ "message": "Bad request", "statusCode": "400" }`);
  } catch (_error: any) {
    const errString = error(JSON.parse(_error.message));
    expect(errString).toEqual({ message: "Bad request", statusCode: "400" });
  }
});
