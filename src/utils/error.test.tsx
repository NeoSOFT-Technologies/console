import error from "./error";

test("calling the function of error", () => {
  try {
    throw new Error(`{ "message": "Bad request", "statusCode": "400" }`);
  } catch (error_: any) {
    const errString = error(JSON.parse(error_.message));
    expect(errString).toEqual({ message: "Bad request", statusCode: "400" });
  }
});
