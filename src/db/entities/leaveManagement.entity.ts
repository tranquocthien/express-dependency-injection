import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('leave_managements')
export class LeaveManagement {
  @PrimaryGeneratedColumn('uuid', { name: 'uid' })
  uid!: string;

  @Column({ name: 'tenant_id', nullable: true })
  tenantId?: string;

  @Column({ name: 'employee_id' })
  employeeId!: string;

  @Column({ name: 'time_leave_benefit_id' })
  timeLeaveBenefitId!: string;

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
}
