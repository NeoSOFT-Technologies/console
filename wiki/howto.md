# How To Guide
For getting started with the console template you need to follow the following steps :

`Step 1` :  Cloning the repository
```
git clone https://github.com/NeoSOFT-Technologies/console.git
```
after the successful run of thē command you will have folder name `console`

`Step 2` :  Installation of the all packages, dependences and dev-dependences. Go inside the `console` folder and run :
```
npm install
```

after the successful run of thē command you will have folder name `node_modules` inside `console` folder 

Note : if the above command gives you the error you can force the installation by using `npm install -f`

`Step 3` : Running  the project with this command : 
```
npm start
```
after the successful run of thē command you will find an output on the browser on port number `3000`

`Step 4` : Now you can add pages and components to your project. For adding pages and components you need to understand the file structure for that you can refer to `README.md` file.

### For adding an component go to `console/src/components/` and add
```
📂 mycomponent
 |- 📝 MyComponent.tsx
 |- 📝 MyComponent.test.tsx
 |- 📝 MyComponent.scss
```
## 📝 MyComponent.scss
This file will contain the custom scss code for the Component.
## 📝 MyComponent.test.tsx
This file will contain the test case for the Component for writing testcase refer to `testing.md` in `wiki`.
## 📝 MyComponent.tsx
This file will contain the main code and the functionality for the component.

### For adding a page you have to ensure at which level you want to add the page we have folder segregation as follows :
Location : `console/src/pages/features/`
```
📂 tenants
 |- 📁 admin
 |- 📁 tenant
 |- 📁 user
📂 gateway
 |- 📁 admin
 |- 📁 tenant
 |- 📁 user
📂 saas
 |- 📁 admin
 |- 📁 tenant
 |- 📁 user
```
For Further explaination we procced with an example by adding a `DemoPage` inside `console/src/pages/features/tenants/admin/` 

`Step 5` : Adding the folder for the page with three files in it as below

```
📂 demopage
 |- 📝 DemoPage.tsx
 |- 📝 DemoPage.test.tsx
 |- 📝 DemoPage.scss
```
## 📝 DemoPage.scss
This file will contain the custom scss code for the page.
## 📝 DemoPage.test.tsx
This file will contain the test case for the page for writing testcase refer to `testing.md` in `wiki`.
## 📝 DemoPage.tsx
This file will contain the main code and the functionality with a basic boilerplate as below
```js
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Spinner from "realtive path";
import { useAppDispatch, useAppSelector } from "relative path";
import { getCall } from "relative path";

function DemoPage() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.demoPage);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCall());
  }, [dispatch]);
  useEffect(() => {
    if(!loading && error){
     navigate("/error", { state: error });
    }
  }, [loading]);

  return (
    {loading ? (
        <Spinner />
      ) : (
      //your code here
      )
      }
  );
}

export default DemoPage;
```

Note : keep in mind about the naming convension for reference check eslint rules in `.eslintrc.json`

`Step 6` : Adding the relative redux-tool-kit slice for the api call and the state management at `console/src/store/`

considering the example adding a folder for slice at `console/src/store/features/admin/` 
```
📂 demo-page
 |- 📝 slice.ts
```
## 📝 slice.ts
This file will contain the reducer and the middleware logic, for reference how to write slice [click here...](https://redux-toolkit.js.org/introduction/getting-started)
```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../../../../services";
import error from "../../utils/error";

interface DemoPageState {
  data?: string | null;
  loading: boolean;
  error?: string | null;
}

const initialState: DemoPageState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getCall = createAsyncThunk(
  "getCall/getDetails",
  async () => {
    try {
      const response =  await getUserData();
      return response.data;
    } catch (error_) {
      throw new Error(error(error_));
    }
  }
);

const slice = createSlice({
  name: "demoPage",
  initialState,
  reducers: {
  //reducer logic here
  },
  extraReducers(builder): void {
    builder.addCase(getCall.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getCall.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getCalls.rejected, (state, action) => {
      state.loading = false;
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
```
`Step 7` : Adding the slice in the store index at `console/src/store/index.ts `

```js
//import
import demoPageReducer from "./features/admin/demo-page/slice";
const store = configureStore({
  reducer: {
    demoPage: demoPageReducer, // your reducer added here
    .
    .
    .
    .
  },
});
```
`Step 8` : Adding the route for the page, For that you have to go to `console/src/AppRoutes.tsx `

In the file you can see the segregation of the route on the bases of common, admin, tenant & user. It is simple to add a common page all you have to do is to import and give the `<Route>` and path for the component,but when it comes to the type specific path you have to wrap the route with an relative authgaurd component.

There are 3 type of authgaurd

- AdminGuard : this is a component which wraps around a `<Route>` component to authorize the admin to access the  specific routes avialable to admin.    
- TenantGuard : this is a component which wraps around a `<Route>` component to authorize the tenant to access the  specific routes avialable to tenant.
- UserGuard : this is a component which wraps around a `<Route>` component to authorize the user to access the  specific routes avialable to user.

Check `console/src/components/auth-gaurd/index.tsx ` to learn how authgaurd is working 

Adding Route For DemoPage :
```js
//import as lazy loading 
const DemoPage = lazy(
  () => import("./pages/features/tenants/admin/demopage/DemoPage")
);
// inside the admion route segregation add route with admin authgaurd

{/************************ADMIN ROUTES***********************/}
        <Route
          path="/demopage"
          element={
            <AdminGuard>
              <DemoPage />
            </AdminGuard>
          }
        />
{/***********************************************************/}
```
### Note : if you want to page in an full screen layout then you have to add the path of the page into a state in the `App.tsx` which is `fullPageLayoutRoutes`

`Step 9`(optional) : Add route in the sidebar for that go to `console/src/routes/` there you find the sub route folder like :
```
📂 tenants
 |- 📁 admin
 |- 📁 tenant
 |- 📁 user
📂 gateway
 |- 📁 admin
 |- 📁 tenant
 |- 📁 user
📂 saas
 |- 📁 admin
 |- 📁 tenant
 |- 📁 user
```
choose the route folder accordingly

For DemoPage we add the route in `console/src/routes/tenants/admin.ts`. In the file you find an array of object follow the structure and write the array value
```js
 {
    path: "/demopage",// same as written in AppRoutes.tsx
    title: "Demo Page",// title will be display on the sidebar
    icon: "bi bi-person-circle",//a relative icon 
  },
```