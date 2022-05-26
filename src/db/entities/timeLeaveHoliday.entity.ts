import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('time_leave_holidays')
export class TimeLeaveHoliday {
  @PrimaryGeneratedColumn('uuid', { name: 'uid' })
  uid!: string;

  @Column({ name: 'tenant_id', nullable: true })
  tenantId?: string;

  @Column({ name: 'working_time_id' })
  workingTimeId!: string;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'start_date' })
  startDate?: Date;

  @Column({ name: 'end_date' })
  endDate?: Date;

  @Column({ name: 'is_salary' })
  isSalary?: number;

  @Column({ name: 'compensating_time' })
  compensatingTime?: Date;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: null })
  updatedAt?: Date;
}
