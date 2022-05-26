import { ICreateTimeLeaveBenefit } from './interface/timeLeaveBenefitInterface';
import { Service } from 'typedi';
import { TimeLeaveBenefit } from '../../db/entities/timeLeaveBenefit.entity';
import { AppDataSource } from './../../db/index';
import { IUpdateTimeLeaveBenefit } from './interface/timeLeaveBenefitInterface';

@Service()
export default class TimeLeaveBenefitRepo {
  constructor(
    private readonly repository = AppDataSource.getRepository(TimeLeaveBenefit)
  ) {}

  async getByUid(uid: string) {
    return await this.repository.find({
      where: {
        uid: uid,
      },
    });
  }

  async createNew(timeLeaveBenefit: ICreateTimeLeaveBenefit) {
    const newLeaveBenefit = this.repository.create({
      name: timeLeaveBenefit.name,
      standardLeave: timeLeaveBenefit.standardLeave,
      benefitTypeCode: timeLeaveBenefit.benefitTypeCode,
      expirationTypeCode: timeLeaveBenefit.expirationTypeCode,
      taskDescription: timeLeaveBenefit.taskDescription,
      status: TimeLeaveBenefit.STATUS.ACTIVE,
      maximumCarryOnDay: timeLeaveBenefit.maximumCarryOnDay,
    });
    return await this.repository.save(newLeaveBenefit);
  }

  async searchByName(
    limit: number,
    offset: number,
    keyword: string,
    sort: any,
    order: any
  ) {
    return await this.repository
      .createQueryBuilder('time_leave_benefits')
      .select()
      .limit(limit)
      .offset(offset)
      .orderBy(sort, order)
      .where('LOWER(time_leave_benefits.name) LIKE LOWER(:keyword)', {
        keyword: `%${keyword}%`,
      })
      .getMany();
  }

  async getList(limit: number, offset: number, sort: string, order: any) {
    return await this.repository
      .createQueryBuilder('time_leave_benefits')
      .select()
      .limit(limit)
      .offset(offset)
      .orderBy(sort, order)
      .getMany();
  }

  async updateStatusByUid(uid: string, status: number) {
    return await this.repository
      .createQueryBuilder()
      .update()
      .set({
        status: status,
      })
      .where('uid = :uid', { uid })
      .execute();
  }

  async update(uid: string, data: IUpdateTimeLeaveBenefit) {
    return await this.repository.update(uid, {
      name: data.name,
      standardLeave: data.standardLeave,
      benefitTypeCode: data.benefitTypeCode,
      expirationTypeCode: data.expirationTypeCode,
      taskDescription: data.taskDescription,
      status: data.status,
      maximumCarryOnDay: data.maximumCarryOnDay,
    });
  }

  async deleteByUid(uid: string) {
    return await this.repository.delete({ uid: uid });
  }
}
