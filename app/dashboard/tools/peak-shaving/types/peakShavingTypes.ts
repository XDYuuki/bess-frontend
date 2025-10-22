import { IPaginationData } from "@/services/types/ApiBaseTypes";

export interface IPeakShaving {
    id: string;
    user_id: string;
    start_peak_time: Date; // ISO 8601 datetime string
    end_peak_time: Date;   // ISO 8601 datetime string
    created_at: Date;      // ISO 8601 datetime string
    updated_at?: Date;     // ISO 8601 datetime string (opcional)
    name: string
    max_daily_energy : number
    min_daily_energy : number
    max_daily_power : number
    min_daily_power : number
    energy_average : number
    power_average : number
    daily_energie_list : number[]
    max_daily_power_list : number[]
    day_list : number[]
}

export interface IGetPeakShavingResponse extends IPaginationData<IPeakShaving> {
}

export interface ICreatePeakShavingRequest {
    power_profile: File;
    start_peak_time: string; // Formato HH:mm
    end_peak_time: string;   // Formato HH:mm
    name: string;
}

// Interface para dados enviados para API (conforme Swagger)
export interface ICreatePeakShavingApiRequest {
    power_profile: string;     // string($binary) - base64
    start_peak_time: string;   // string($date-time) - ISO datetime
    end_peak_time: string;     // string($date-time) - ISO datetime
    name: string;
}