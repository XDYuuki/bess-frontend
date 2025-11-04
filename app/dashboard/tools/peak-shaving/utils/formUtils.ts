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

/**
 * Calcula intervalos automaticamente para histograma usando a regra de Sturges
 * @param data Array de números
 * @param minIntervalWidth Largura mínima do intervalo (opcional)
 * @returns Array de intervalos {min, max}[]
 */
export const calculateIntervals = (
  data: number[],
  minIntervalWidth?: number
): { min: number; max: number }[] => {
  if (data.length === 0) return [];

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;

  // Usa a regra de Sturges para calcular o número de intervalos
  const numberOfIntervals = Math.ceil(1 + 3.322 * Math.log10(data.length));
  
  // Calcula a largura do intervalo
  let intervalWidth = range / numberOfIntervals;
  
  // Se minIntervalWidth foi fornecido, usa o maior valor
  if (minIntervalWidth && intervalWidth < minIntervalWidth) {
    intervalWidth = minIntervalWidth;
  }
  
  // Arredonda a largura para um valor "bonito" (múltiplo de 100, 500, etc)
  const roundedIntervalWidth = Math.ceil(intervalWidth / 100) * 100;
  
  // Arredonda o mínimo para baixo e máximo para cima
  const roundedMin = Math.floor(min / 100) * 100;
  const roundedMax = Math.ceil(max / 100) * 100;
  
  // Cria os intervalos
  const intervals: { min: number; max: number }[] = [];
  let currentMin = roundedMin;
  
  while (currentMin < roundedMax) {
    const currentMax = currentMin + roundedIntervalWidth;
    intervals.push({
      min: currentMin,
      max: currentMax,
    });
    currentMin = currentMax;
  }
  
  // Garante que o último intervalo inclua o valor máximo
  if (intervals.length > 0) {
    intervals[intervals.length - 1].max = Math.max(intervals[intervals.length - 1].max, roundedMax);
  }
  
  return intervals;
};