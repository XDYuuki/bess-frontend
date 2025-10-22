import { Routes } from "@/app/auth/Routes";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { refreshToken } from "../auth/AuthApi";


const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const BaseApi = axios.create({
	baseURL: baseUrl
});

// BaseApi.interceptors.request.use(
// 	async (config) => {
// 		const token = localStorage.getItem('token');
// 		const key = localStorage.getItem('integrationKey');
// 		config.headers['x-api-key'] = key;
// 		if (token) {
// 			await refreshInterceptor();
// 			config.headers.Authorization = `Bearer ${token}`;
// 		} else
// 			if (config.url?.includes('/login')) {
// 				config.headers.Authorization = undefined;
// 			} else if (config.url?.includes('/register')) {
// 				config.headers.Authorization = undefined;
// 			} else if (config.url?.includes('/refresh')) {
// 				config.headers.Authorization = undefined;
// 			}
// 		return config;
// 	}
// );

// BaseApi.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	(error) => {

// 		//disabled erro when pass diableError on param 
// 		if (error.config?.params?.disableError) {
// 			return Promise.reject(error);
// 		}
// 		if (error.response.status === 500) {
			
// 		}
// 		const title = error.response.data.title ?? "Erro desconhecido";
// 		toast({
// 			title: title,
// 			duration: 5000,
// 		});
// 		if (error.response.status === 401 && !error.config.url?.includes('/login')) {
// 			window.location.href = Routes.login;
// 		}
// 		return Promise.reject(error);
// 	}
// );

// const refreshInterceptor = async () => {
// 	const _refreshToken = localStorage.getItem('refreshToken');
// 	const expires = localStorage.getItem('expires');
// 	if (_refreshToken && expires) {
// 		const expiresDate = new Date(expires);
// 		const now = new Date();
// 		if (expiresDate < now) {
// 			try {
// 				const response = await refreshToken(_refreshToken)
// 				if(!response.token){
// 					throw new Error('Token inválido');
// 				}
// 			} catch (e) {
// 				toast({
// 					title: 'Erro',
// 					description: 'Sessão expirada',
// 					duration: 5000,
// 				});
// 				window.location.href = Routes.login;
// 			}
// 		}
// 	}
// }

export default BaseApi;