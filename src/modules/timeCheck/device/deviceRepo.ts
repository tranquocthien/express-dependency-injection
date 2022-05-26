import { Device } from './../../../db/entities/device.entity';
import { AppDataSource } from './../../../db/index';
import { CreateDeviceInputDto } from './dto/deviceDto';
import { Service } from "typedi";

@Service()
export default class DeviceRepo{
    constructor(
        private readonly deviceRepository = AppDataSource.getRepository(Device)
    ){
        
    }

    async getAll(filter: any): Promise<Device[]>{
        console.log(filter)
        const result = await this.deviceRepository
            .createQueryBuilder('ts_device')
            .where('LOWER(name) LIKE :name',{name: `%${filter.search}%`})
            .orderBy(filter.order,filter.sort)
            .skip(filter.page)
            .take(filter.limit)
            .getMany()
        return result
    }

    async createNewOne(newDevice: CreateDeviceInputDto ): Promise<any>{
        const result = this.deviceRepository.create({
            name: newDevice.name,
            tokenKey: newDevice.tokenKey,
            description: newDevice.description
        })
        await this.deviceRepository.save(result)
        return result
    }

    async getByuid(uid:string){
        const result = this.deviceRepository.findOne({where:{uid:uid}})
        return result
    }

    async updateOne(newUpdate: any,uid:string){
        console.log(newUpdate)
        await this.deviceRepository.update(uid, newUpdate)
        const result = await this.deviceRepository.findOne({where:{uid: uid}})
        return result
    }

    async deleteOne(uid:string): Promise<boolean>{
        await this.deviceRepository.delete(uid)
        return true
    }
    
}
