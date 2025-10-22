import BaseApi from "@/services/api/BaseApi";
import { ICreatePeakShavingRequest, IPeakShaving } from "../types/peakShavingTypes";
import { PeakShavingFormData } from "@/lib/schemas/peakShaving";

const baseUrl = '/api/peak-shaving'

console.log("BaseApi configurado com baseURL:", process.env.NEXT_PUBLIC_API_BASE_URL);

const getPeakShaving = async (userId: string): Promise<IPeakShaving[]> => {
	const response = await BaseApi.get(`${baseUrl}/user/${userId}`);
	return response.data;
}

const createPeakShaving = async (data: ICreatePeakShavingRequest): Promise<IPeakShaving> => {
	const response = await BaseApi.post(`${baseUrl}`, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	
	return response.data;
}

export { getPeakShaving, createPeakShaving };