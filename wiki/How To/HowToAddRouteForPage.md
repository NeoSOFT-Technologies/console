# Guide To Add Route For Page

For adding route for a page you have to check that at which level you have added the page. We have folder segregation as follows :

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

For Further explaination we procced with an example by adding the route for `DemoPage` which we created inside `console/src/pages/features/tenants/admin/` in `HowToAddPage` guide.

#### Adding the route for the page
For that you have to go to `console/src/AppRoutes.tsx `

In the file you can see the segregation of the route on the bases of common, admin, tenant & user. It is simple to add a common page all you have to do is to import and give the `<Route>` and path for the component,but when it comes to the type specific path you have to wrap the route with an relative authgaurd component.

There are 3 type of authgaurd
- AdminGuard : this is a component which wraps around a `<Route>` component to authorize the admin to access the specific routes avialable to admin.
- TenantGuard : this is a component which wraps around a `<Route>` component to authorize the tenant to access the specific routes avialable to tenant.
- UserGuard : this is a component which wraps around a `<Route>` component to authorize the user to access the specific routes avialable to user.

Check `console/src/components/auth-gaurd/index.tsx ` to learn how authgaurd is working.

**Adding Route For DemoPage** :

```js
//import as lazy loading
const  DemoPage = lazy(
	() =>  import("./pages/features/tenants/admin/demopage/DemoPage")
);

// inside the admion route segregation add route with admin authgaurd
{/************************ADMIN ROUTES***********************/}
<Route
	path="/demopage"
	element={
		<AdminGuard>
			<DemoPage  />
		</AdminGuard>
	}
/>
{/***********************************************************/}

```

#### Note : if you want to page in an full screen layout then you have to add the path of the page into a state in the `App.tsx` which is `fullPageLayoutRoutes`
