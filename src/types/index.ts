export interface IHeadings {
  title: string;
  className?: string;
}
export interface ITenantData {
  tenantName: string;
  email?: string;
  password?: string;
  description?: string;
  databaseName?: string;
  databaseDescription?: string;
  createdDateTime?: string;
  isDeleted?: boolean;
  roles?: string[];
  permissions?: string[];
  id?: number;
  type?: string;
}

export interface ITenantDetail {
  name: string;
  description: string;
  databaseName: string;

  userid: string;
  email: string;

  type: string;
  id?: number;
}
export interface IErrorTenantDetail {
  description: string;
}

export interface ITenantUserData {
  userName: string;
  email: string;
  tenantName: string;
  createdDateTime: string;
}

export interface IActionsRenderList {
  className?: string;
  iconClassName?: string;
  buttonFunction?: (value: any) => void;
}
export interface ITenantDataList {
  data: ITenantData[];
  fields: string[];
}
export interface ITenantUserDataList {
  data: ITenantUserData[];
  fields: string[];
}

export interface ISetTenantList {
  data: ITenantData[];
  count: number;
}
export interface ISetTenantRoles {
  roles: string[];
}
export interface ISetTenantPermissions {
  id: string;
  name: string;
  description: string;
  type: string;
  logic: string;
  decisionStrategy: string;
  resourceType: string;
}
export interface ISetTenantUserList {
  list: ITenantUserData[];
  count: number;
}

export interface IErrorInput {
  name: boolean;
  userid: boolean;
  email: boolean;
  no: boolean;
}
export interface IErrorTenantInput {
  tenantName: string;
  email: string;
  password: string;
  description: string;
  databaseName: string;
}
export interface IAdminData {
  username: string;
  createdTimestamp: string;
  count: number;
  roles: string[];
}
// redux toolkit states

export interface ITenantListState {
  data?: ISetTenantList | null;
  loading: boolean;
  error?: string | null;
}

export interface ITenantRolesState {
  data?: string[] | null;
  loading: boolean;
  error?: string | null;
}

export interface ITenantPermissionsState {
  data?: ISetTenantPermissions[] | null;
  loading: boolean;
  error?: string | null;
}
export interface ITenantDetails {
  id: number;
  userid: string;
  description: string;
  lastlogin: string;
}

export interface ITenantUserListState {
  data?: ITenantUserData[] | null;
  loading: boolean;
  error?: string | null;
}

export interface IUserDataState {
  data?: (ITenantData & IAdminData & IUserDetailsData) | null;
  loading: boolean;
  error?: string | null;
}

/// /actions

export interface actionTenantList {
  type: string;
  payload: ISetTenantList;
}

export interface IUserDetailsData {
  id: string;
  createdTimestamp: string;
  username: string;
  enabled: boolean;
  emailVerified: boolean;
  email: string;
  access: {
    manageGroupMembership: boolean;
    view: boolean;
    mapRoles: boolean;
    impersonate: boolean;
    manage: boolean;
  };
  tenantName: string;
  roles: string[];
  permissions: string[];
}
