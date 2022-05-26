import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"device"})
export class Device{
    @Column({nullable:true})
    tenantId?: string

    @PrimaryGeneratedColumn('uuid')
    uid!: string

    @Column("varchar",{length:60})
    name!:string

    @Column({type:"text"})
    description!: string

    @Column({nullable:true})
    lastSyncTime?: Date 
    
    @Column("varchar")
    tokenKey!: string

    @Column("varchar",{nullable:true})
    clientId?: string 

    @Column("varchar",{nullable:true})
    clientSecret?: string

    @Column("varchar",{nullable:true})
    deviceTimeZone?: string

    @Column({type: "integer",default:0,nullable:true})
    isActive?: number
    
}
