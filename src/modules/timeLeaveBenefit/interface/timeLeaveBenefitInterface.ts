export interface ICreateTimeLeaveBenefit {
  name: string;
  standardLeave: number;
  benefitTypeCode: number;
  expirationTypeCode: number;
  taskDescription: string;
  maximumCarryOnDay: number;
}

export interface IUpdateTimeLeaveBenefit {
  name?: string;
  standardLeave?: number;
  benefitTypeCode?: number;
  expirationTypeCode?: number;
  taskDescription?: string;
  status?: number;
  maximumCarryOnDay?: number;
}
