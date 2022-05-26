import { Device } from '../../../db/entities/device.entity';
import { ERROR_CODE } from '../../../core/constants/errorMessage';
import { InvalidInputError} from '../../../core/constants/errors';
import { Service } from "typedi";
import { CreateDeviceInputDto } from './dto/deviceDto';
import DeviceRepo from './deviceRepo';

export enum sort{
    ASC = "ASC",
    DESC = "DESC"
}
export interface pagging{
    search?: string,
    limit?: number,
    page?: number,
    order?: string,
    sort?: sort
}
@Service()
export class DeviceService{
    constructor(private readonly deviceRepo: DeviceRepo){}

    async getAll(filter:pagging): Promise<Device[]>{
        const result = await this.deviceRepo.getAll(filter)
        return result
    }

    async createNewOne(newDeivice:CreateDeviceInputDto): Promise<Device>{
        if(!newDeivice.name || !newDeivice.description || !newDeivice.tokenKey){
            throw new InvalidInputError(ERROR_CODE.INVALID_INPUT_ERROR)
        }
        const result = await this.deviceRepo.createNewOne(newDeivice)
        return result
    }
    
    async updateOne(newUpdate: any,uid:string){
        if(!uid){
            throw new InvalidInputError(ERROR_CODE.INVALID_INPUT_ERROR)
        }
        const checkFormat = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
        if(!checkFormat.test(uid)){
            throw new InvalidInputError("FORMAT_UID_INCORRECT")
            }
        const checkValid = await this.deviceRepo.getByuid(uid)
        if(!checkValid){
            throw new InvalidInputError("DEVICE_NOT_FOUND")
        }
        const result = await this.deviceRepo.updateOne(newUpdate,uid)
        return result;
    }

    async deleteOne(uid:string): Promise<boolean>{
        if(!uid){
            throw new InvalidInputError(ERROR_CODE.INVALID_INPUT_ERROR)
        }
        const checkFormat = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
        if(!checkFormat.test(uid)){
            throw new InvalidInputError("FORMAT_UID_INCORRECT")
        }
        const checkValid = await this.deviceRepo.getByuid(uid)
        if(!checkValid){
            throw new InvalidInputError("DEVICE_NOT_FOUND")
        }
        const result= await this.deviceRepo.deleteOne(uid)
        return result;
    }

}
