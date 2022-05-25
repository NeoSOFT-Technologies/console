// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const error = (object: any): any => {
  let message = "Undefined Error";
  let statusCode = "400";
  if (object && object.message) {
    message = object.message;
  }
  if (object && object.statusCode) {
    statusCode = object.statusCode;
  }
  return { ...object, statusCode, message };
};

export default error;
