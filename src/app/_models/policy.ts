export interface IPolicy {
  id: string;
  amountInsured: number;
  email: string;
  inceptionDate: string;
  installmentPayment: boolean;
  clientId: string;
}

export interface IPolicies {
  policies: IPolicy[];
}