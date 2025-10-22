import { PeakShavingFormData } from "@/lib/schemas/peakShaving";
import { createPeakShaving, getPeakShaving } from "../services/peakShavingApi";
import { ICreatePeakShavingRequest, IPeakShaving } from "../types/peakShavingTypes";
import { timeStringToISODateTime } from "../utils/formUtils";

export const GetPeakShavingUseCase = async (): Promise<IPeakShaving[]> => {
    const temporaryUserId = "12345678-1234-1234-1234-123456789012";
    const peakShaving = await getPeakShaving(temporaryUserId);
    return peakShaving;
}

export const CreatePeakShavingUseCase = async (data: PeakShavingFormData): Promise<IPeakShaving> => {
    
    const start = timeStringToISODateTime(data.startPeakTime);
    const end = timeStringToISODateTime(data.endPeakTime);

    const apiData: ICreatePeakShavingRequest = {
        power_profile: data.powerProfile!,
        start_peak_time: start,
        end_peak_time: end,
        name: data.name
    };
    
    const peakShaving = await createPeakShaving(apiData);
    return peakShaving;
}