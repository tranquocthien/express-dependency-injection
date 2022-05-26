import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('time_leave_policies')
export class TimeLeavePolicy {
  @PrimaryGeneratedColumn('uuid', { name: 'uid' })
  uid!: string;

  @Column({ name: 'tenant_id', nullable: true })
  tenantId?: string;

  @Column({ name: 'name' })
  name?: string;

  @Column({ name: 'is_salary' })
  isSalary?: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: null })
  updatedAt?: Date;
}
