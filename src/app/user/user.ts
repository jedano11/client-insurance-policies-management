export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface IClients {
  clients: IUser[];
}