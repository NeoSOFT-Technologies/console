# Code Coverage Metrics

## Unit test cases

```
-----------------------------------------------|---------|----------|---------|---------|-------------------
File                                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------------------------------|---------|----------|---------|---------|-------------------
All files                                      |   27.59 |    16.86 |   27.16 |   27.96 |                   
 src                                           |   70.88 |    88.88 |   32.35 |   75.71 |                   
  App.scss                                     |     100 |      100 |     100 |     100 |                   
  App.tsx                                      |     100 |     87.5 |     100 |     100 | 45-47             
  AppRoutes.tsx                                |    54.9 |      100 |   11.53 |   60.46 | ...54,58,61,64,69 
  WithRouter.tsx                               |     100 |      100 |     100 |     100 |                   
 src/components/breadcrumbs                    |   66.66 |      100 |      40 |   66.66 |                   
  Breadcrumbs.scss                             |     100 |      100 |     100 |     100 |                   
  Breadcrumbs.tsx                              |   64.28 |      100 |      40 |   64.28 | 17-19,25-28       
 src/components/footer                         |     100 |      100 |     100 |     100 |                   
  Footer.tsx                                   |     100 |      100 |     100 |     100 |                   
 src/components/gateway/list                   |       0 |        0 |       0 |       0 |                   
  Pagination.tsx                               |       0 |        0 |       0 |       0 | 9-51              
  RenderList.tsx                               |       0 |        0 |       0 |       0 | 27-69             
 src/components/header                         |     100 |      100 |     100 |     100 |                   
  Header.tsx                                   |     100 |      100 |     100 |     100 |                   
 src/components/list                           |   95.45 |       50 |    87.5 |   95.45 |                   
  RenderList.tsx                               |   95.23 |       50 |    87.5 |   95.23 | 88                
  render-list.scss                             |     100 |      100 |     100 |     100 |                   
 src/components/loader                         |     100 |      100 |     100 |     100 |                   
  Loader.tsx                                   |     100 |      100 |     100 |     100 |                   
 src/components/mutli-select-dropdown          |     100 |      100 |     100 |     100 |                   
  MultiSelectDropdown.tsx                      |     100 |      100 |     100 |     100 |                   
  multiselectdropdown.scss                     |     100 |      100 |     100 |     100 |                   
 src/components/navbar                         |   61.53 |        0 |   42.85 |   61.53 |                   
  Navbar.tsx                                   |   61.53 |        0 |   42.85 |   61.53 | 23,27-28,49-73    
 src/components/password-field                 |     100 |      100 |     100 |     100 |                   
  Password.tsx                                 |     100 |      100 |     100 |     100 |                   
 src/components/radio                          |   66.66 |       50 |      50 |   66.66 |                   
  RadioButton.scss                             |     100 |      100 |     100 |     100 |                   
  RadioButton.tsx                              |      60 |       50 |      50 |      60 | 53-57             
 src/components/roles-and-permissions          |     100 |      100 |     100 |     100 |                   
  RolesAndPermissions.tsx                      |     100 |      100 |     100 |     100 |                   
 src/components/sidebar                        |   91.66 |    82.14 |   76.92 |   91.66 |                   
  Sidebar.scss                                 |     100 |      100 |     100 |     100 |                   
  Sidebar.tsx                                  |   91.42 |    82.14 |   76.92 |   91.42 | 121,165,209       
 src/components/statistics-dashborad           |   71.42 |      100 |      50 |   71.42 |                   
  StatisticsDashboard.tsx                      |   66.66 |      100 |      50 |   66.66 | 28-45             
  statisticsDashboard.scss                     |     100 |      100 |     100 |     100 |                   
 src/components/toast-alert                    |     100 |      100 |     100 |     100 |                   
  toast-alert.ts                               |     100 |      100 |     100 |     100 |                   
 src/pages/error-pages                         |   90.47 |    66.66 |     100 |      90 |                   
  Error.tsx                                    |   88.23 |    66.66 |     100 |    87.5 | 26-27             
  Error401.tsx                                 |     100 |      100 |     100 |     100 |                   
  Error404.tsx                                 |     100 |      100 |     100 |     100 |                   
  Error500.tsx                                 |     100 |      100 |     100 |     100 |                   
  error.scss                                   |     100 |      100 |     100 |     100 |                   
 src/pages/features/gateway                    |       0 |      100 |       0 |       0 |                   
  Dashboard.tsx                                |       0 |      100 |       0 |       0 | 5                 
 src/pages/features/gateway/api/create         |       0 |        0 |       0 |       0 |                   
  CreateApi.tsx                                |       0 |        0 |       0 |       0 | 22-139            
 src/pages/features/gateway/api/list           |       0 |        0 |       0 |       0 |                   
  APIList.tsx                                  |       0 |        0 |       0 |       0 | 31-241            
 src/pages/features/gateway/api/update         |       0 |        0 |       0 |       0 |                   
  Update.tsx                                   |       0 |        0 |       0 |       0 | 22-139            
 ...atures/gateway/api/update/advanced-options |       0 |      100 |       0 |       0 |                   
  AdvancedOptions.tsx                          |       0 |      100 |       0 |       0 | 7                 
 ...pi/update/advanced-options/blacklisted-ips |       0 |        0 |       0 |       0 |                   
  BlacklistedIPs.tsx                           |       0 |        0 |       0 |       0 | 15-221            
 ...y/api/update/advanced-options/cors-options |       0 |        0 |       0 |       0 |                   
  CorsOptions.tsx                              |       0 |        0 |       0 |       0 | 15-761            
 ...pi/update/advanced-options/whitelisted-ips |       0 |        0 |       0 |       0 |                   
  WhitelistedIPs.tsx                           |       0 |        0 |       0 |       0 | 15-222            
 src/pages/features/gateway/api/update/setting |       0 |        0 |       0 |       0 |                   
  Setting.tsx                                  |       0 |        0 |       0 |       0 | 16-132            
 .../gateway/api/update/setting/authentication |       0 |        0 |       0 |       0 |                   
  Authentication.tsx                           |       0 |        0 |       0 |       0 | 16-97             
 ...etting/authentication/authentication-token |       0 |      100 |       0 |       0 |                   
  AuthenticationToken.tsx                      |       0 |      100 |       0 |       0 | 5                 
 ...i/update/setting/authentication/mutual-tls |       0 |        0 |       0 |       0 |                   
  MutualTLS.tsx                                |       0 |        0 |       0 |       0 | 18-543            
 ...ate/setting/authentication/open-id-connect |       0 |        0 |       0 |       0 |                   
  OpenIdConnect.tsx                            |       0 |        0 |       0 |       0 | 18-693            
 ...update/setting/authentication/open-keyless |       0 |      100 |       0 |       0 |                   
  OpenKeyLess.tsx                              |       0 |      100 |       0 |       0 | 5                 
 ...res/gateway/api/update/setting/listen-path |       0 |        0 |       0 |       0 |                   
  ListenPath.tsx                               |       0 |        0 |       0 |       0 | 14-117            
 ...ures/gateway/api/update/setting/rate-limit |       0 |        0 |       0 |       0 |                   
  RateLimit.tsx                                |       0 |        0 |       0 |       0 | 14-136            
 ...ures/gateway/api/update/setting/target-url |       0 |        0 |       0 |       0 |                   
  TargetUrl.tsx                                |       0 |        0 |       0 |       0 | 17-136            
 ...pi/update/setting/target-url/load-balacing |       0 |        0 |       0 |       0 |                   
  LoadBalancing.tsx                            |       0 |        0 |       0 |       0 | 18-189            
 src/pages/features/gateway/api/update/version |       0 |        0 |       0 |       0 |                   
  Version.tsx                                  |       0 |        0 |       0 |       0 | 12-75             
 ...ateway/api/update/version/version-settings |       0 |      100 |       0 |       0 |                   
  VersionSettings.tsx                          |       0 |      100 |       0 |       0 | 10-68             
 ...atures/gateway/api/update/version/versions |       0 |        0 |       0 |       0 |                   
  Versions.tsx                                 |       0 |        0 |       0 |       0 | 18-394            
 ...es/gateway/common-settings/api-access-List |       0 |        0 |       0 |       0 |                   
  ApiAccessList.tsx                            |       0 |        0 |       0 |       0 | 21-173            
 ...tures/gateway/common-settings/global-limit |       0 |        0 |       0 |       0 |                   
  GlobalLimit.tsx                              |       0 |        0 |       0 |       0 | 20-172            
  GlobalLimitApi.tsx                           |       0 |        0 |       0 |       0 | 30-1307           
  GlobalRateLimit.tsx                          |       0 |        0 |       0 |       0 | 29-809            
 ...eway/common-settings/path-based-permission |       0 |        0 |       0 |       0 |                   
  PathBased.tsx                                |       0 |        0 |       0 |       0 | 27-519            
  path-file-Key.tsx                            |       0 |        0 |       0 |       0 | 15-202            
  path-file.tsx                                |       0 |        0 |       0 |       0 | 15-199            
 src/pages/features/gateway/key/create         |       0 |        0 |       0 |       0 |                   
  CreateKey.tsx                                |       0 |        0 |       0 |       0 | 20-237            
 .../features/gateway/key/create/access-rights |       0 |        0 |       0 |       0 |                   
  AccessRights.tsx                             |       0 |        0 |       0 |       0 | 14-113            
 ...eway/key/create/access-rights/apply-policy |       0 |        0 |       0 |       0 |                   
  ApplyPolicy.tsx                              |       0 |        0 |       0 |       0 | 8-9               
 ...create/access-rights/apply-policy/policies |       0 |        0 |       0 |       0 |                   
  Policies.tsx                                 |       0 |        0 |       0 |       0 | 6-17              
 ...ate/access-rights/apply-policy/policy-list |       0 |        0 |       0 |       0 |                   
  PolicyList.tsx                               |       0 |        0 |       0 |       0 | 21-326            
 ...ateway/key/create/access-rights/choose-api |       0 |        0 |       0 |       0 |                   
  ChooseApi.tsx                                |       0 |        0 |       0 |       0 | 8-12              
 ...create/access-rights/choose-api/api-access |       0 |        0 |       0 |       0 |                   
  ApiAccess.tsx                                |       0 |        0 |       0 |       0 | 6-19              
 ...access-rights/choose-api/api-access-rights |       0 |        0 |       0 |       0 |                   
  AccessList.tsx                               |       0 |        0 |       0 |       0 | 16-86             
 ...features/gateway/key/create/configurations |       0 |        0 |       0 |       0 |                   
  Configurations.tsx                           |       0 |        0 |       0 |       0 | 11-87             
 src/pages/features/gateway/key/list           |       0 |        0 |       0 |       0 |                   
  KeyList.tsx                                  |       0 |        0 |       0 |       0 | 25-209            
 src/pages/features/gateway/policy/create      |       0 |        0 |       0 |       0 |                   
  CreatePolicy.tsx                             |       0 |        0 |       0 |       0 | 17-141            
 ...atures/gateway/policy/create/access-rights |       0 |        0 |       0 |       0 |                   
  AccessRights.tsx                             |       0 |        0 |       0 |       0 | 8-9               
 ...way/policy/create/access-rights/api-access |       0 |        0 |       0 |       0 |                   
  ApiAccess.tsx                                |       0 |        0 |       0 |       0 | 6-16              
 ...icy/create/access-rights/api-access-rights |       0 |        0 |       0 |       0 |                   
  AccessList.tsx                               |       0 |        0 |       0 |       0 | 16-90             
 ...way/policy/create/access-rights/partitions |       0 |      100 |       0 |       0 |                   
  Partitions.tsx                               |       0 |      100 |       0 |       0 | 10-58             
 ...tures/gateway/policy/create/configurations |       0 |        0 |       0 |       0 |                   
  Configurations.tsx                           |       0 |        0 |       0 |       0 | 11-106            
 src/pages/features/gateway/policy/list        |       0 |        0 |       0 |       0 |                   
  PolicyList.tsx                               |       0 |        0 |       0 |       0 | 26-207            
 ...ges/features/tenants/admin/register-tenant |   77.08 |    58.57 |     100 |   77.08 |                   
  RegisterTenant.tsx                           |   77.08 |    58.57 |     100 |   77.08 | ...39,144,187-191 
 ...ages/features/tenants/admin/tenant-details |   74.28 |    61.53 |   78.94 |      75 |                   
  TenantDetails.tsx                            |   74.28 |    61.53 |   78.94 |      75 | ...74,186,213-247 
 src/pages/features/tenants/admin/tenant-list  |   86.66 |     87.5 |   66.66 |   86.66 |                   
  TenantList.tsx                               |   86.66 |     87.5 |   66.66 |   86.66 | 23,41             
 src/pages/features/tenants/tenant/create-user |   69.84 |    58.18 |   68.75 |   69.84 |                   
  CreateUser.tsx                               |   69.35 |    58.18 |   68.75 |   69.35 | ...54,182-186,193 
  createuser.scss                              |     100 |      100 |     100 |     100 |                   
 ...s/features/tenants/tenant/tenant-dashboard |    87.5 |     62.5 |     100 |    87.5 |                   
  TenantDashboard.tsx                          |    87.5 |     62.5 |     100 |    87.5 | 16                
 ...ges/features/tenants/tenant/tenant-profile |   83.01 |    58.62 |    92.3 |   82.35 |                   
  TenantProfile.tsx                            |   83.01 |    58.62 |    92.3 |   82.35 | ...14,121,135-138 
 ...pages/features/tenants/tenant/user-details |      85 |    77.27 |     100 |      85 |                   
  UserDetails.scss                             |     100 |      100 |     100 |     100 |                   
  UserDetails.tsx                              |   84.81 |    77.27 |     100 |   84.81 | ...61-162,170,209 
 src/pages/features/tenants/tenant/user-list   |      75 |       50 |   33.33 |      75 |                   
  UserList.tsx                                 |      75 |       50 |   33.33 |      75 | 11,31             
 ...features/tenants/user/role-and-permissions |   85.71 |    35.71 |     100 |   85.71 |                   
  RoleAndPermissions.tsx                       |   85.71 |    35.71 |     100 |   85.71 | 17                
 ...pages/features/tenants/user/user-dashboard |    87.5 |     62.5 |     100 |    87.5 |                   
  UserDashboard.tsx                            |   85.71 |     62.5 |     100 |   85.71 | 19                
  userDashboard.scss                           |     100 |      100 |     100 |     100 |                   
 src/pages/login                               |   89.47 |    70.83 |     100 |   89.28 |                   
  Login.tsx                                    |   89.47 |    70.83 |     100 |   89.28 | ...70,121-122,125 
 src/resources/gateway                         |       0 |        0 |       0 |       0 |                   
  common.ts                                    |       0 |        0 |       0 |       0 | 2-20              
 src/resources/gateway/api                     |       0 |      100 |       0 |       0 |                   
  api-constants.ts                             |       0 |      100 |       0 |       0 | 7-35              
 src/resources/gateway/key                     |       0 |      100 |       0 |       0 |                   
  key-constants.ts                             |       0 |      100 |       0 |       0 | 7-15              
 src/resources/gateway/policy                  |       0 |      100 |       0 |       0 |                   
  policy-constants.ts                          |       0 |      100 |       0 |       0 | 7-15              
 src/resources/tenant                          |     100 |      100 |     100 |     100 |                   
  constants.ts                                 |     100 |      100 |     100 |     100 |                   
  images.ts                                    |     100 |      100 |     100 |     100 |                   
  testconfig.ts                                |       0 |        0 |       0 |       0 |                   
 src/routes/tenants                            |     100 |      100 |     100 |     100 |                   
  admin.ts                                     |     100 |      100 |     100 |     100 |                   
  tenants.ts                                   |     100 |      100 |     100 |     100 |                   
  user-routes.ts                               |     100 |      100 |     100 |     100 |                   
 src/store                                     |     100 |      100 |     100 |     100 |                   
  hooks.ts                                     |     100 |      100 |     100 |     100 |                   
 src/store/features/admin/add-tenant           |     100 |      100 |     100 |     100 |                   
  slice.ts                                     |     100 |      100 |     100 |     100 |                   
 src/store/features/admin/delete-tenant        |    91.3 |      100 |   83.33 |    91.3 |                   
  slice.ts                                     |    91.3 |      100 |   83.33 |    91.3 | 35-36             
 src/store/features/admin/tenant-roles         |     100 |      100 |     100 |     100 |                   
  slice.ts                                     |     100 |      100 |     100 |     100 |                   
 src/store/features/gateway/api/create         |   35.29 |        0 |      20 |   35.29 |                   
  slice.ts                                     |   35.29 |        0 |      20 |   35.29 | ...35,38-40,43-44 
 src/store/features/gateway/api/delete         |   31.57 |        0 |      20 |   31.57 |                   
  slice.ts                                     |   31.57 |        0 |      20 |   31.57 | ...34,37-38,42-46 
 src/store/features/gateway/api/list           |   31.57 |        0 |      20 |   31.57 |                   
  slice.ts                                     |   31.57 |        0 |      20 |   31.57 | ...44,47-54,57-61 
 src/store/features/gateway/api/update         |   29.72 |        0 |    9.09 |   29.72 |                   
  payload.ts                                   |     100 |      100 |     100 |     100 |                   
  slice.ts                                     |   27.77 |        0 |    9.09 |   27.77 | ...75,78,81,85-89 
 src/store/features/gateway/certificate/create |   31.57 |        0 |      20 |   31.57 |                   
  slice.ts                                     |   31.57 |        0 |      20 |   31.57 | ...38,41-43,46-47 
 src/store/features/gateway/certificate/list   |   30.43 |        0 |   16.66 |   30.43 |                   
  slice.ts                                     |   30.43 |        0 |   16.66 |   30.43 | ...43,46-47,52-55 
 src/store/features/gateway/key/create         |   30.18 |        0 |    6.66 |   30.18 |                   
  payload.ts                                   |     100 |      100 |     100 |     100 |                   
  slice.ts                                     |   27.45 |        0 |    6.66 |   27.45 | ...09,112,116-119 
 src/store/features/gateway/key/delete         |       0 |        0 |       0 |       0 |                   
  slice.ts                                     |       0 |        0 |       0 |       0 | 8-46              
 src/store/features/gateway/key/list           |   33.33 |        0 |      20 |   33.33 |                   
  slice.ts                                     |   33.33 |        0 |      20 |   33.33 | ...40,43-44,52-55 
 src/store/features/gateway/policy/create      |   31.37 |        0 |    6.66 |   31.37 |                   
  payload.ts                                   |     100 |      100 |     100 |     100 |                   
  slice.ts                                     |   28.57 |        0 |    6.66 |   28.57 | ...09,112,116-119 
 src/store/features/gateway/policy/delete      |   31.57 |        0 |      20 |   31.57 |                   
  slice.ts                                     |   31.57 |        0 |      20 |   31.57 | ...34,37-38,42-46 
 src/store/features/gateway/policy/list        |   33.33 |        0 |      20 |   33.33 |                   
  slice.ts                                     |   33.33 |        0 |      20 |   33.33 | ...40,43-44,52-55 
 src/store/features/tenant/add-user            |     100 |      100 |     100 |     100 |                   
  slice.ts                                     |     100 |      100 |     100 |     100 |                   
 src/store/features/tenant/delete-user         |   90.47 |      100 |   83.33 |   90.47 |                   
  slice.ts                                     |   90.47 |      100 |   83.33 |   90.47 | 38-39             
 src/store/features/tenant/tenant-details      |   86.95 |      100 |   83.33 |   86.95 |                   
  slice.ts                                     |   86.95 |      100 |   83.33 |   86.95 | 36-38             
 src/store/features/tenant/update-tenant       |    87.5 |      100 |   83.33 |    87.5 |                   
  slice.ts                                     |    87.5 |      100 |   83.33 |    87.5 | 36-38             
 src/store/features/user/update-user           |   81.48 |       75 |   83.33 |   81.48 |                   
  slice.ts                                     |   81.48 |       75 |   83.33 |   81.48 | 31-32,48-50       
 src/store/features/user/user-details          |    87.5 |      100 |   83.33 |    87.5 |                   
  slice.ts                                     |    87.5 |      100 |   83.33 |    87.5 | 42-44             
 src/store/landing                             |     100 |      100 |     100 |     100 |                   
  slice.ts                                     |     100 |      100 |     100 |     100 |                   
 src/store/login                               |     100 |      100 |     100 |     100 |                   
  slice.ts                                     |     100 |      100 |     100 |     100 |                   
 src/store/login-type                          |   86.95 |    77.77 |   83.33 |   86.95 |                   
  slice.ts                                     |   86.95 |    77.77 |   83.33 |   86.95 | 38,56-57          
 src/store/logout                              |     100 |      100 |     100 |     100 |                   
  slice.ts                                     |     100 |      100 |     100 |     100 |                   
 src/store/user-data                           |      60 |    18.18 |   71.42 |      60 |                   
  slice.ts                                     |      60 |    18.18 |   71.42 |      60 | 34-40,55-66       
 src/utils                                     |   69.49 |    61.11 |   81.81 |   70.68 |                   
  api.ts                                       |   67.44 |    59.09 |   77.77 |   67.44 | ...2,63,69,86-100 
  error-handler.ts                             |      50 |    16.66 |     100 |   57.14 | 7-9               
  error.ts                                     |     100 |      100 |     100 |     100 |                   
 src/utils/gateway                             |    6.45 |        0 |       0 |    6.45 |                   
  helper.ts                                    |       0 |        0 |       0 |       0 | 3-13              
  permission.helper.ts                         |    8.33 |        0 |       0 |    8.33 | 17-21,26-79       
-----------------------------------------------|---------|----------|---------|---------|-------------------
```
                       
