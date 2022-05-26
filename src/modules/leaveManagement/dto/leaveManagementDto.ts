import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import BaseResponseDto from '../../../core/models/baseResponseDto';

export class CreateLeaveManagementInputDto {
  @IsNotEmpty()
  @IsString()
  employeeId!: string;

  @IsNotEmpty()
  @IsString()
  timeLeaveBenefitId!: string;
}
