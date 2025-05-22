export default interface TokenType {
  accessToken: string;
  expiration: Date;
  refreshToken: string;
}

export interface DecodedToken {
  jti: string; 
  nameid: string; 
  Email: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  Roles: string; 
  role: string;
  PhoneNumber: string;
  exp?: number; 
  iat?: number; 
  [key: string]: any; 
}