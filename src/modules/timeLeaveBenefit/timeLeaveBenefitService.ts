import { ERROR_MESSAGE } from './../../core/constants/errorMessage';
import { CreateTimeLeaveBenefitInputDto } from './dto/timeLeaveBenefitDto';
import { InvalidInputError } from '../../core/constants/errors';
import { Inject, Service } from 'typedi';
import TimeLeaveBenefitRepo from './timeLeaveBenefitRepo';
import * as _ from 'lodash';
import { IUpdateTimeLeaveBenefit } from './interface/timeLeaveBenefitInterface';

@Service()
export class TimeLeaveBenefitService {
    constructor(private readonly repository: TimeLeaveBenefitRepo) { }

    async createNew(timeLeaveBenefit: CreateTimeLeaveBenefitInputDto) {
        const standardLeave: number = timeLeaveBenefit.standardLeave;
        const maximumCarryOnDay: number = timeLeaveBenefit.maximumCarryOnDay;
        if (maximumCarryOnDay > standardLeave) {
            throw new InvalidInputError(ERROR_MESSAGE.MAXIMUM_CARRY_ON_DAY_EXCEEDING_ALLOWABLE_LIMIT);
        }
        const newLeaveBenefit = await this.repository.createNew(timeLeaveBenefit);
        return {
            newLeaveBenefit: newLeaveBenefit,
        };
    }

    async getAllTimeLeaveBenefit(
        limit: number,
        page: number,
        dir: string,
        sort: string,
        inputName: string
    ) {
        const orders = ['ASC', 'DESC'];
        const order =
            dir && _.indexOf(orders, _.trim(_.toUpper(dir))) >= 0
                ? _.trim(_.toUpper(dir))
                : 'DESC';
        const offset: number = limit * page - limit;
        const sortColumns: any = {
            CREATEDAT: 'created_at',
            NAME: 'name',
            STANDARDLEAVE: 'standard_leave',
            BENEFITTYPECODE: 'benefit_type_code',
            EXPIRATIONTYPECODE: 'expiration_type_code',
            TASKDESCRIPTION: 'task_description',
            MAXIMUMCARRYONDAY: 'maximum_carry_on_day',
            STATUS: 'status',
        };
        const sortColumn =
            sort && sortColumns[_.trim(_.toUpper(sort))]
                ? sortColumns[_.trim(_.toUpper(sort))]
                : 'created_at';
        if (inputName) {
            const result = await this.repository.searchByName(
                limit,
                offset,
                inputName,
                sortColumn,
                order
            );
            return {
                timeLeaveBenefits: result,
                pagination: {
                    limit: limit,
                    page: page,
                    records: '',
                    totalRecords: result.length,
                },
            };
        }
        const result = await this.repository.getList(
            limit,
            offset,
            sortColumn,
            order
        );
        return {
            timeLeaveBenefits: result,
            pagination: {
                limit: limit,
                page: page,
                records: '',
                totalRecords: result.length,
            },
        };
    }

    async getLeaveBenefitByUid(uid: string) {
        const existingLeaveBenefit = await this.repository.getByUid(uid);
        if (!existingLeaveBenefit.length) {
            throw new InvalidInputError(ERROR_MESSAGE.LEAVE_BENEFIT_NOT_FOUND);
        }
        const result = await this.repository.getByUid(uid);
        return result[0];
    }

    async updateStatusById(uid: string, status: number) {
        const existingLeaveBenefit = await this.repository.getByUid(uid);
        // const statusText = _.findKey(TimeLeaveBenefit.STATUS, (s) => s === status);
        if (!existingLeaveBenefit.length) {
            throw new InvalidInputError(ERROR_MESSAGE.LEAVE_BENEFIT_NOT_FOUND);
        }
        await this.repository.updateStatusByUid(uid, status);
        return {
            status: status,
        };
    }

    async update(uid: string, data: IUpdateTimeLeaveBenefit) {
        const existingLeaveBenefit = await this.repository.getByUid(uid);
        console.log(existingLeaveBenefit)
        if (!existingLeaveBenefit.length) {
            throw new InvalidInputError(ERROR_MESSAGE.LEAVE_BENEFIT_NOT_FOUND);
        }
        if (data.standardLeave && data.maximumCarryOnDay) {
            const standardLeave: number = data.standardLeave;
            const maximumCarryOnDay: number = data.maximumCarryOnDay;
            if (maximumCarryOnDay > standardLeave) {
                throw new InvalidInputError(ERROR_MESSAGE.MAXIMUM_CARRY_ON_DAY_EXCEEDING_ALLOWABLE_LIMIT);
            }
        }
        if (data.maximumCarryOnDay && data.maximumCarryOnDay > existingLeaveBenefit[0].standardLeave) {
            throw new InvalidInputError(ERROR_MESSAGE.MAXIMUM_CARRY_ON_DAY_EXCEEDING_ALLOWABLE_LIMIT);
        }
        await this.repository.update(uid, data);

        return {
            status: 'Success',
        };
    }

    async deleteById(uid: string) {
        const existingLeaveBenefit = await this.repository.getByUid(uid);
        if (!existingLeaveBenefit.length) {
            throw new InvalidInputError(ERROR_MESSAGE.LEAVE_BENEFIT_NOT_FOUND);
        }
        await this.repository.deleteByUid(uid);
        return {
            status: 'Success',
        };
    }
}
