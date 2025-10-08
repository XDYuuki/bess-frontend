import { z } from "zod";

export const batterySizingSchema = z.object({
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
  voltageProfile: z
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
  internalResistance: z
    .number()
    .min(0, "Resistência interna deve ser maior ou igual a 0")
    .max(1000, "Resistência interna deve ser menor que 1000"),
  cn: z
    .number()
    .min(1, "Cn deve ser maior que 0")
    .max(10000, "Cn deve ser menor que 10000"),
  crRate: z
    .number()
    .min(0.1, "Taxa Cr deve ser maior que 0.1")
    .max(10, "Taxa Cr deve ser menor que 10"),
  batteryType: z.enum(['Li-ion', 'LiFePO4', 'Lead-Acid', 'NiMH', 'NiCd']),
  socMax: z
    .number()
    .min(0, "SOC máximo deve ser maior ou igual a 0")
    .max(100, "SOC máximo deve ser menor ou igual a 100"),
  socMin: z
    .number()
    .min(0, "SOC mínimo deve ser maior ou igual a 0")
    .max(100, "SOC mínimo deve ser menor ou igual a 100")
    .refine(
      (val, ctx) => {
        const socMax = ctx.parent?.socMax;
        return socMax === undefined || val < socMax;
      },
      {
        message: "SOC mínimo deve ser menor que SOC máximo",
      }
    ),
  vdc: z
    .number()
    .min(1, "VDC deve ser maior que 0")
    .max(1000, "VDC deve ser menor que 1000"),
  partNumber: z
    .string()
    .min(1, "Número da peça é obrigatório")
    .max(50, "Número da peça deve ter no máximo 50 caracteres"),
  chemistry: z.enum(['Lithium', 'Lead-Acid', 'Nickel']),
});

export type BatterySizingFormData = z.infer<typeof batterySizingSchema>;
