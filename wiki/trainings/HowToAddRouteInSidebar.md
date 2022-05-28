# Guide To Add Route In Sidebar

For this guide we proceed with an example by adding the route for `DemoPage` in the sidebar which we created inside `console/src/pages/features/tenants/admin/` in `HowToAddPage` guide.

To add route in the sidebar, go to `console/src/routes/` there you find the sub route folder like :

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
