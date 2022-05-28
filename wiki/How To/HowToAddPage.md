# Guide To Add Page

For adding a page you have to ensure at which level you want to add the page we have folder segregation as follows :

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

Adding the folder for the page with three files in it as below

  

```
📂 demopage
|- 📝 DemoPage.tsx
|- 📝 DemoPage.test.tsx
|- 📝 DemoPage.scss
```

### 📝 DemoPage.scss

This file will contain the custom scss code for the page.

### 📝 DemoPage.test.tsx

This file will contain the test case for the page for writing testcase refer to `testing.md` in `wiki`.

### 📝 DemoPage.tsx

This file will contain the main code and the functionality with a basic boilerplate as below

```js
import  React, { useEffect } from  "react";
import { useNavigate } from  "react-router";
import  Spinner  from  "realtive path";
import { useAppDispatch, useAppSelector } from  "relative path";
import { getCall } from  "relative path";


function  DemoPage() {
	const  dispatch = useAppDispatch();
	const { data, loading, error } = useAppSelector((state) => state.demoPage);
	const  navigate = useNavigate();

	useEffect(() => {
		dispatch(getCall());
	}, [dispatch]);

	useEffect(() => {
		if(!loading && error){
			navigate("/error", { state:  error });
		}
	}, [loading]);

	return (
		{
			loading ? (
				<Spinner />
			) : (
				//your code here
			)
		}
	);
}

export  default  DemoPage;
```  

Note : keep in mind about the naming convension for reference check eslint rules in `.eslintrc.json`
