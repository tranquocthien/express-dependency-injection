import { LeaveManagement } from '../../db/entities/leaveManagement.entity';
import { Service } from 'typedi';
import { AppDataSource } from '../../db/index';

@Service()
export default class LeaveManagementRepo {
    constructor(
        private readonly repository = AppDataSource.getRepository(LeaveManagement)
    ) { }

    async createNew(employeeId: string, timeLeaveBenefitId: string) {
        const newLeaveManagement = this.repository.create({
            employeeId: employeeId,
            timeLeaveBenefitId: timeLeaveBenefitId,
        });

        return await this.repository.save(newLeaveManagement);
    }

    async searchFilter(limit: number, offset: number, order: string, sortColumn: string, name: string, benefit: string) {
        let conditions: any[] = [];
        if (name) {
            conditions.push(`LOWER(users.username) LIKE LOWER('%${name}%')`);
        }
        if (benefit) {
            conditions.push(`LOWER(time_leave_benefits.name) LIKE LOWER('%${benefit}%')`);
        }
        const query = `SELECT 
            time_leave_benefits.name AS name, 
            users.username AS username
        FROM leave_managements
        INNER JOIN time_leave_benefits ON UUID(leave_managements.time_leave_benefit_id) = time_leave_benefits.uid
        INNER JOIN users ON UUID(leave_managements.employee_id ) = users.uid 
        ${conditions.length ? `WHERE ${conditions.join(' AND ')}` : ""}
        ORDER BY ${sortColumn} ${order}
        LIMIT ${limit} OFFSET ${offset}`
        return await this.repository.query(query)
    }

    async getList(limit: number, offset: number, sort: string, order: any) {
    }


}
