export interface IUserDetail {
  id: string;
  fullName: string;
  email: string;
  role: string;
  phoneNumber: string;
  towFacotrEnabled: true;
  phoneNumberConfirmed: true;
  accessFailesCount: 0;
}

export interface IAdminRegisterAccount{
  emailAddress: string;
  fullName:string;
  role:string;
}