import { DeviceService } from "./deviceService";
import { Request, Response } from 'express';
import Container, { Service } from "typedi";
import {
    JsonController,
    Get,
    Put,
    Param,
    Post,
    Body,
    Delete,
    Req,
    Res,
} from 'routing-controllers';
import { GET, Path, PathParam, POST } from 'typescript-rest';
import { CreateDeviceInputDto } from "./dto/deviceDto";

export enum sort {
    ASC = "ASC",
    DESC = "DESC"
}
@Service()
@JsonController('time-check/devices')
export default class DeviceController {
    private readonly deviceService: DeviceService =
        Container.get(DeviceService);
    constructor() { }

    @Get()
    async getAll(@Req() req: Request, @Res() res: Response) {
        const filter = {
            search: req.query.search ? req.query.search.toString().toLowerCase() : '',
            limit: req.query.limit ? Number(req.query.limit) : 10,
            page: req.query.page ? (Number(req.query.page) - 1) * Number(req.query.limit) : 0,
            order: req.query.order ? req.query.order.toString() : 'name',
            sort: !req.query.dir ? sort.ASC : (req.query.dir.toString().toLocaleUpperCase() === 'DESC' ? sort.DESC : sort.ASC)
        }
        try {
            const result = await this.deviceService.getAll(filter)
            return res.status(200).json({
                data: result,
                metadata: {
                    code: 'SUCCESS',
                    message: 'Success',
                    pagination: {
                        limit: filter.limit,
                        page: filter.page + 1,
                        records: '',
                        totalRecords: result.length,
                    }
                },
            });

        } catch (err: any) {
            return res.status(400).json({
                data: {},
                metadata: {
                    code: err.code,
                    message: err.message,
                },
            });

        }
    }

    @Post()
    async createNewOne(@Body() body: CreateDeviceInputDto, @Res() res: Response) {
        try {
            const result = await this.deviceService.createNewOne(body)
            return res.status(201).json({
                data: result,
                metadata: {
                    code: 'SUCCESS',
                    message: 'Success',
                },
            });

        } catch (err: any) {
            return res.status(400).json({
                data: {},
                metadata: {
                    code: err.code,
                    message: err.message,
                },
            });
        }
    }

    @Put('/:uid')
    async updateOne(@Body() body: any, @Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.deviceService.updateOne(req.body, req.params.uid)
            return res.status(200).json({
                data: result,
                metadata: {
                    code: 'SUCCESS',
                    message: 'Success',
                },
            });
        } catch (err: any) {
            return res.status(400).json({
                data: {},
                metadata: {
                    code: "ERROR",
                    message: err.message,
                },
            });
        }
    }

    @Delete("/:uid")
    async deleteOne(@Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.deviceService.deleteOne(req.params.uid)
            return res.status(200).json({
                data: result,
                metadata: {
                    code: 'SUCCESS',
                    message: 'Success',
                },
            });
        } catch (err: any) {
            return res.status(400).json({
                data: {},
                metadata: {
                    code: err.code,
                    message: err.message,
                },
            });
        }
    }
}
