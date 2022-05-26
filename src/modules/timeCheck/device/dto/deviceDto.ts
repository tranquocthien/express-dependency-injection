import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateDeviceInputDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  tokenKey!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;
}

export interface UpdateDeviceInputDto {
    tenantId?: string;
    name?: string;
    description?: string;
    lastSyncTime?: Date;
    tokenKey?: string;
    clientId?: string;
    clientSecrect?: string;
    deviceTimeZone?: string;
    isActive?: number;
  }
  