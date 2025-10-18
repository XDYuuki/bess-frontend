import { z } from "zod";

export const peakShavingSchema = z.object({
  powerProfile: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        if (!file) return true; // Arquivo é opcional
        const allowedTypes = [
          'application/vnd.ms-excel', // .xls
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
          'application/octet-stream', // .mat
        ];
        return allowedTypes.includes(file.type) || file.name.endsWith('.mat');
      },
      {
        message: "Arquivo deve ser .mat, .xls ou .xlsx",
      }
    ),
});

export type PeakShavingFormData = z.infer<typeof peakShavingSchema>;
