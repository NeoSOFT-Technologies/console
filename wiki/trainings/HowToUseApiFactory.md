# Api Factory

Api Factory is a common utility tool for making all your backend api calls.

# Usage

Step 1 : import api factory into service file .

```
import apiFactory from "relative path";
```

Step 2 : create a function which returns object of api call from backend .
<br>
Here we use apiFactory() following with methods like GET,PUT,POST,DELETE,etc. according to request type
like  example below
```
export function functionName(parameter1: type) {
  return apiFactory().get(`api`);
}
```

Below are some examples of apiFactory() - 
```
export function functionName(parameter1: string,) {
  return apiFactory().get(`api?query=parameter1`);
}
```
```
export function functionName(parameter1: string,) {
  return apiFactory().get(`api/parameter1`);
}
```
```
export function functionName(parameter1: <interface>) {
  return apiFactory().post(`api`,{parameter1});
}
```

Have multiple backend servers to run your application , no worries apiFactory got you covered , to see how [click here]().