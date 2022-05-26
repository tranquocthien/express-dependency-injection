import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'device_user_mapping'})
export class DeviceUserMapping{
    @Column({nullable:true})
    tenantId?: number

    @PrimaryGeneratedColumn('uuid')
    uid!: string

    @Column("integer")
    deviceUserId!:number

    @Column("varchar")
    deviceId!: string
    
    @Column("varchar",{length:60})
    userDeviceName!: string

    @Column("varchar",{nullable:true})
    employeeCode?: string 
    
}
