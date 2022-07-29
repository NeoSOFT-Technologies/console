export interface IGetAllCertificateState {
  data: ICertificateState | undefined;
  loading: boolean;
  error?: string | null;
}

export interface ICertificateState {
  CertificateCollection: IGetAllCertificateData[];
}
export interface IGetAllCertificateData {
  CertId: string;
  Issuer: string;
  SignatureAlgorithm: string;
  Subject: string;
  Thumbprint: string;
  ValidNotAfter: string;
  ValidNotBefore: string;
  showDetails: boolean;
  addState: boolean;
}
