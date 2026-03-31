export interface ILoginPayload {
  email: string;
  password: string;
  save_me?: boolean;
  captcha_token?: string;
}

export interface IRegisterPayload extends ILoginPayload {
  username?: string;
  repeat_password?: string;
}

export interface IAccount {
  id: string;
  email?: string;
  [key: string]: unknown;
}

export interface ILoginResponse {
  accounts?: IAccount[];
  access: string;
  refresh: string;
  user?: { id: string; email: string };
}

export interface IAuthResponse {
  token?: string;
  user?: { id: string; email: string };
}

export interface ILogoutRequest {
  refresh: string;
}

export interface IRefreshResponse {
  access: string;
  refresh?: string;
}
