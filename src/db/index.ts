import { Device } from './entities/device.entity';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
  LeaveManagement,
  TimeLeaveBenefit,
  TimeLeaveHoliday,
  TimeLeavePolicy,
} from './entities/index';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    TimeLeavePolicy,
    LeaveManagement,
    TimeLeaveBenefit,
    TimeLeaveHoliday,
    Device
  ],
  logging: false,
  synchronize: true,
});
