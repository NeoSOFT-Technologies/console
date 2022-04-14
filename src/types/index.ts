export interface ILogin {
  userName: string;
  password: string;
  tenantName: string;
}

export interface IHeadings {
  title: string;
  className?: string;
}

export interface IUserDataState {
  data?: (IAdminData & ITenantDetail & IUserDetailsData) | null;
  loading: boolean;
  error?: string | null;
}

export interface IAdminData {
  username: string;
  createdTimestamp: string;
  count: number;
  roles: string[];
}

export interface ITenantDetail {
  id: number;
  tenantId: number;
  tenantName: string;
  description: string;
  createdDateTime: string;
  databaseName: string;
  host: string;
  port: number;
  policy: string;
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

export interface ITenantRegisterData {
  tenantName: string;
  email: string;
  password: string;
  description: string;
  databaseName: string;
  databaseDescription: string;
}

export interface ICreateNewUser {
  userName: string;
  email: string;
  password: string;
  roles: string[];
  permissions: string[];
}

export interface IUserPermission {
  id: string;
  name: string;
  description: string;
  type: string;
  logic: string;
  decisionStrategy: string;
  resourceType: string;
}

export interface ITenantRolesState {
  data?: string[] | null;
  loading: boolean;
  error?: string | null;
}

export interface ITenantUserData {
  userName: string;
  email: string;
  createdDateTime: string;
}

export interface ITenantPermissionsState {
  data?: IUserPermission[] | null;
  loading: boolean;
  error?: string | null;
}

export interface ITenantUserListState {
  data?: ISetTenantUserList | null;
  loading: boolean;
  error?: string | null;
}

export interface ISetTenantUserList {
  data: ITenantUserData[];
  count: number;
}

export interface ITenantListState {
  data?: ISetTenantList | null;
  loading: boolean;
  error?: string | null;
}

export interface ISetTenantList {
  data: {
    id: number;
    tenantName: string;
    email: string;
    password: string;
    description: string;
    databaseName: string;
    databaseDescription: string;
    createdDateTime: string;
    isDeleted: boolean;
    clientId: string;
    clientSecret: string;
  }[];
  count: number;
}

export interface IErrorTenantInput {
  tenantName: string;
  email: string;
  password: string;
  description: string;
  databaseName: string;
}

/**
 * TODO :  the interface above this are proper
 */

export interface IErrorTenantDetail {
  description: string;
}

export interface IActionsRenderList {
  className?: string;
  iconClassName?: string;
  buttonFunction?: (value: any) => void;
}

export interface ITenantDataList {
  data: ITenantRegisterData[];
  fields: string[];
}
export interface ITenantUserDataList {
  data: ITenantUserData[];
  fields: string[];
}
