import { TimeLeaveBenefit } from './../../../db/entities/timeLeaveBenefit.entity';
import { ICreateTimeLeaveBenefit } from './../interface/timeLeaveBenefitInterface';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import BaseResponseDto from './../../../core/models/baseResponseDto';

export class CreateTimeLeaveBenefitInputDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  standardLeave!: number;

  @IsNotEmpty()
  @IsNumber()
  benefitTypeCode!: number;

  @IsNotEmpty()
  @IsNumber()
  expirationTypeCode!: number;

  @IsNotEmpty()
  @IsString()
  taskDescription!: string;

  @IsNotEmpty()
  @IsNumber()
  maximumCarryOnDay!: number;
}
