export interface IBaterySizing {
  powerProfile?: File;
  voltageProfile?: File;
  internalResistance: number;
  cn: number;
  crRate: number;
  batteryType: 'Li-ion' | 'LiFePO4' | 'Lead-Acid' | 'NiMH' | 'NiCd';
  socMax: number;
  socMin: number;
  vdc: number;
  partNumber: string;
  chemistry: 'Lithium' | 'Lead-Acid' | 'Nickel';
}

export const batteryTypeOptions = [
  { value: 'Li-ion', label: 'Li-ion' },
  { value: 'LiFePO4', label: 'LiFePO4' },
  { value: 'Lead-Acid', label: 'Lead-Acid' },
  { value: 'NiMH', label: 'NiMH' },
  { value: 'NiCd', label: 'NiCd' },
] as const;

export const chemistryOptions = [
  { value: 'Lithium', label: 'Lithium' },
  { value: 'Lead-Acid', label: 'Lead-Acid' },
  { value: 'Nickel', label: 'Nickel' },
] as const;

export const defaultBatteryData: IBaterySizing = {
  powerProfile: undefined,
  voltageProfile: undefined,
  internalResistance: 0.1,
  cn: 100,
  crRate: 0.5,
  batteryType: 'Li-ion',
  socMax: 100,
  socMin: 20,
  vdc: 48,
  partNumber: '',
  chemistry: 'Lithium',
};
