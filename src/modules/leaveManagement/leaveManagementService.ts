import { ERROR_MESSAGE } from './../../core/constants/errorMessage';
import { InvalidInputError } from './../../core/constants/errors';
import { Inject, Service } from 'typedi';
import * as _ from 'lodash';
import LeaveManagementRepo from './leaveManagementRepo';
import TimeLeaveBenefitRepo from '../timeLeaveBenefit/timeLeaveBenefitRepo';
import { DataSource } from "typeorm"

@Service()
export class LeaveManagementService {
    constructor(
        @Inject()
        private readonly repository: LeaveManagementRepo,
        @Inject()
        private readonly timeLeaveBenefitRepository: TimeLeaveBenefitRepo
    ) { }

    async createNew(employeeId: string, timeLeaveBenefitId: string) {
        const timeLeaveBenefit = await this.timeLeaveBenefitRepository.getByUid(
            timeLeaveBenefitId
        );
        console.log(timeLeaveBenefit);
        if (!timeLeaveBenefit.length) {
            throw new InvalidInputError(ERROR_MESSAGE.LEAVE_BENEFIT_NOT_FOUND);
        }
        console.log(timeLeaveBenefit);
        const result = await this.repository.createNew(
            employeeId,
            timeLeaveBenefitId
        );
        return {
            status: result,
        };
    }

    async getList(limit: number, page: number, dir: string, sort: string, name: string, benefit: string) {
        const offset: number = limit * page - limit;
        const orders = ['ASC', 'DESC'];
        const order =
            dir && _.indexOf(orders, _.trim(_.toUpper(dir))) >= 0
                ? _.trim(_.toUpper(dir))
                : 'DESC';
        const sortColumns: any = {
            NAME: 'users.username',
            BENEFIT: 'time_leave_benefits.name',
            // REMAININGLEAVE: 'remaining_leave'
        };
        const sortColumn =
            sort && sortColumns[_.trim(_.toUpper(sort))]
                ? sortColumns[_.trim(_.toUpper(sort))]
                : sortColumns.name;

        const result = await this.repository.searchFilter(limit, offset, order, sortColumn, name, benefit)
        console.log(result)
        return result;
    }
}
