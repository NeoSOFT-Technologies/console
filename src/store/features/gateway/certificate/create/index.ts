export interface IAddCertificateState {
  certAdded?: boolean;
  loading: boolean;
  error?: string | null;
  data?: string | null;
}

export interface ICertificate {
  File: File;
}

export interface IApiFormData {
  name: string;
  listenPath: string;
  targetUrl: string;
  isActive: boolean;
  stripListenPath?: boolean;
  Id?: string;
}

export interface IErrorApiInput {
  name: string;
  targetUrl: string;
  listenPath: string;
  // status: boolean;
}
