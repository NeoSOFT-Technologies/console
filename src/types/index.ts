export interface IHeadings {
  title: string;
  className?: string;
}
export interface ITenantData {
  name: string;
  description: string;
  databaseName: string;
  databaseDescription: string;
  userid: string;
  email: string;
  password?: string;
  type: string;
  id?: number;
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
  name: string;
  userid: string;
  email: string;

  databaseName: string;
}

export interface ITenantUserData {
  id: number;
  userName: string;
  email: string;
  tenantName: string;
  createdDateTime: string;
  isDeleted: boolean;
  isActive: boolean;
}

export interface IActionsRenderList {
  className?: string;
  iconClassName?: string;
  buttonFunction?: (val: any) => void;
}
export interface ITenantDataList {
  list: ITenantData[];
  fields: string[];
}
export interface ITenantUserDataList {
  list: ITenantUserData[];
  fields: string[];
}

export interface ISetTenantList {
  list: ITenantData[];
  count: number;
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
  name: string;
  userid: string;
  email: string;
  password: string;
  databaseName: string;
}

// redux toolkit states

export interface ITenantListState {
  data?: ISetTenantList | null;
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
  data?: ISetTenantUserList | null;
  loading: boolean;
  error?: string | null;
}

export interface IUserDataState {
  data?: ITenantData | null;
  loading: boolean;
  error?: string | null;
}

/// /actions

export interface actionTenantList {
  type: string;
  payload: ISetTenantList;
}
