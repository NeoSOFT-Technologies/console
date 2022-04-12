export interface ICreatePolicyFormData {
  tenantName: string;
  policyName: string;
  description: string;
  roles: string[];
}

export interface ICreatePolicyState {
  isCreated: boolean;
  loading: boolean;
  error?: string | null;
}
export interface ICreatePolicyErrors {
  policyName: string;
  description: string;
  roles: string;
}
