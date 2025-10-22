import { PeakShavingFormData } from "@/lib/schemas/peakShaving";
import { ICreatePeakShavingRequest, ICreatePeakShavingApiRequest } from "../types/peakShavingTypes";


export const timeStringToISODateTime = (timeString: string): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    // Monta a string diretamente: YYYY-MM-DDTHH:mm:ss.sssZ
    const isoString = `${year}-${month}-${day}T${timeString}:00.000Z`;
    
    return isoString;
  };
