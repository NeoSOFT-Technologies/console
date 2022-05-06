export interface IGetAllCertificateState {
  data: ICertificateState | undefined;
  loading: boolean;
  error?: string | null;
}

export interface ICertificateState {
  form: IGetAllCertificateData[];
}
export interface IGetAllCertificateData {
  CertId: string;
  Issuer: string;
  SignatureAlgorithm: string;
  Subject: string;
  Thumbprint: string;
  ValidNotAfter: string;
  ValidNotBefore: string;
}
