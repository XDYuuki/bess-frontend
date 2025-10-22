import { AxiosResponse } from "axios";

import BaseApi from "../api/BaseApi";
import { GoogleLoginRequest, IConfirmEmailRequest, IForgotPasswordRequest, ILoginRequest, ILoginResponse, IMyselfInfo, IRegisterRequest, IResetPasswordRequest } from "./IAuthDtos";

const base = `/api/auth`

function base64UrlToBase64(base64Url: string) {
	return base64Url.replace(/-/g, '+').replace(/_/g, '/').padEnd(base64Url.length + (4 - base64Url.length % 4) % 4, '=');
}

const GetDataUserFromToken = () => {
	const token = localStorage.getItem('token');
	if (!token) return null;
	const parts = token.split('.');
	if (parts.length !== 3) {
		console.error("Token JWT malformado:", token);
		return null;
	}
	const payload = parts[1];
	try {
		const base64 = base64UrlToBase64(payload);
		const data = JSON.parse(atob(base64));
		return {
			companyId: data.CompanyId,
			userId: data.UserId,
			email: data.Email,
			name: data.FullName,
		};
	} catch (e) {
		console.error("Erro ao decodificar payload JWT:", payload, e);
		return null;
	}
}

const LoginApi = async ({ email, password }: ILoginRequest) => {
	const response = await BaseApi.post<ILoginRequest, AxiosResponse<ILoginResponse>>(`${base}/login`, {
		email,
		password,
	});
	localStorage.setItem('token', response.data.token);
	localStorage.setItem('refreshToken', response.data.refreshToken);
	localStorage.setItem('expires', response.data.expires);
	BaseApi.defaults.headers.Authorization = `Bearer ${response.data.token}`;
	const userData = GetDataUserFromToken();
	return {
		
		...response.data,
		userData: userData
	};
}

const refreshToken = async (refreshToken: string) => {
	const email = GetDataUserFromToken()?.email;
	localStorage.removeItem('token');
	localStorage.removeItem('refreshToken');
	localStorage.removeItem('expires');
	const response = await BaseApi.post<ILoginResponse>(`${base}/refresh`, {
		refreshToken,
		email: email
	});
	BaseApi.defaults.headers.Authorization = `Bearer ${response.data.token}`;
	localStorage.setItem('token', response.data.token);
	localStorage.setItem('refreshToken', response.data.refreshToken);
	localStorage.setItem('expires', response.data.expires);
	return response.data;
}

const RegisterApi = async (data: IRegisterRequest) => {
	//const response = await BaseApi.post(`${base}/register`, data);
	const response = await BaseApi.post(`/api/companies`, data);
	return response.data;
}

const ConfirmEmailApi = async (params: IConfirmEmailRequest) => {
	const response = await BaseApi.get(`${base}/confirmEmail/`, {
		params
	});
	return response.data;
}


const LoginGoogleApi = async (request: GoogleLoginRequest) => {
	const response = await BaseApi.post<GoogleLoginRequest, AxiosResponse<ILoginResponse>>(`/api/google/login`, request);
	localStorage.setItem('token', response.data.token);
	localStorage.setItem('refreshToken', response.data.refreshToken);
	BaseApi.defaults.headers.Authorization = `Bearer ${response.data.token}`;
	return response.data;
}

const ForgotPasswordApi = async (data: IForgotPasswordRequest) => {
	const response = await BaseApi.post(`${base}/forgot-password`, data);
	return response.data;
}

const ResetPasswordApi = async (data: IResetPasswordRequest) => {
	const response = await BaseApi.post(`${base}/reset-password`, data);
	return response.data;
}

const getMyselfInfo = async (): Promise<IMyselfInfo> => {
	const response = await BaseApi.get(`${base}/me`);
	return response.data;
}



export { 
	LoginApi, 
	RegisterApi, 
	refreshToken, 
	ConfirmEmailApi, 
	GetDataUserFromToken, 
	LoginGoogleApi, 
	ForgotPasswordApi, 
	ResetPasswordApi,
	getMyselfInfo
};