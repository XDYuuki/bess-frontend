import { z } from "zod";

export const peakShavingSchema = z.object({
  name: z.string().min(1, "O nome identificador é obrigatório"),
  powerProfile: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        if (!file) return true; // Arquivo é opcional
        const allowedTypes = [
          'application/vnd.ms-excel', // .xls
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
          'text/csv', // .csv
        ];
        return allowedTypes.includes(file.type) || file.name.endsWith('.csv');
      },
      {
        message: "Arquivo deve ser .csv, .xls ou .xlsx",
      }
    ),
  startPeakTime: z.string()
    .min(1, "Hora de início é obrigatória"),
    // .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (use HH:mm)"),
  endPeakTime: z.string()
    .min(1, "Hora de fim é obrigatória")
    // .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (use HH:mm)"),
}).refine(
  (data) => {
    if (!data.startPeakTime || !data.endPeakTime) return true;
    return data.endPeakTime > data.startPeakTime;
  },
  {
    message: "Hora de fim deve ser posterior à hora de início",
    path: ["endPeakTime"],
  }
);

export type PeakShavingFormData = z.infer<typeof peakShavingSchema>;
