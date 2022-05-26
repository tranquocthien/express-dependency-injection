import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('time_leave_benefits')
export class TimeLeaveBenefit {
  @PrimaryGeneratedColumn('uuid', { name: 'uid' })
  uid!: string;

  @Column({ name: 'tenant_id', nullable: true })
  tenantId?: string;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'standard_leave' })
  standardLeave!: number;

  @Column({ name: 'benefit_type_code' })
  benefitTypeCode!: number;

  @Column({ name: 'status', default: 0 })
  status?: number;

  @Column({ name: 'maximum_carry_on_day' })
  maximumCarryOnDay!: number;

  @Column({ name: 'task_description' })
  taskDescription?: string;

  @Column({ name: 'expiration_type_code' })
  expirationTypeCode!: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  static STATUS = {
    INACTIVE: 0,
    ACTIVE: 1,
  };

  static BENEFIT_TYPE_CODE = {
    FIXED_NUMBER_DAYS_PER_YEAR: 0,
    MONTHLY_INCREMENT: 1,
  };

  static EXPIRATION_TYPE_CODE = {
    JAN: 1,
    FEB: 2,
    MAR: 3,
    APR: 4,
    MAY: 5,
    JUN: 6,
    JULY: 7,
    AUG: 8,
    SEP: 9,
    OCT: 10,
    NOV: 11,
    DEC: 12,
  };
}
