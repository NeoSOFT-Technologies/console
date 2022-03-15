// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const error = (object: any): string => {
  let message = "Undefined Error";
  if (object && object.message) {
    message = object.message;
  }
  return message;
};

export default error;
