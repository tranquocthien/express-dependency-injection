import { IUpdateTimeLeaveBenefit } from './interface/timeLeaveBenefitInterface';
import { ERROR_CODE } from './../../core/constants/errorMessage';
import { CreateTimeLeaveBenefitInputDto } from './dto/timeLeaveBenefitDto';
import { Request, Response } from 'express';
import Container, { Service, Inject } from 'typedi';
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
import { TimeLeaveBenefitService } from './timeLeaveBenefitService';

@Service('LeaveBenefitController')
@JsonController('leave-benefit')
@Path('leave-benefit')
export default class TimeLeaveBenefitController {
    private readonly timeLeaveBenefitService: TimeLeaveBenefitService =
        Container.get(TimeLeaveBenefitService);

    @Post()
    // @POST
    async createNew(
        @Body() body: CreateTimeLeaveBenefitInputDto,
        @Res() res: Response
    ) {
        try {
            const result = await this.timeLeaveBenefitService.createNew(body);
            return res.status(200).send({
                data: result,
                metadata: {
                    code: 'SUCCESS',
                    message: 'Success',
                },
            });
        } catch (error: any) {
            console.log(error);
            return res.status(400).send({
                data: {},
                metadata: {
                    code: ERROR_CODE.HTTP_STATUS_ERROR,
                    message: error.message,
                },
            });
        }
    }

    @Get('/')
    // @GET
    async getAllTimeLeaveBenefit(@Req() req: Request, @Res() res: Response) {
        try {
            const limit: number = req.query.limit ? Number(req.query.limit) : 10;
            const page: number = req.query.page ? Number(req.query.page) : 1;
            const dir: string = req.query.dir ? req.query.dir.toString() : 'DESC';
            const inputName: string = req.query.name
                ? req.query.name.toString().trim()
                : '';
            const sort: string = req.query.sort
                ? req.query.sort.toString()
                : 'createdAt';
            const result = await this.timeLeaveBenefitService.getAllTimeLeaveBenefit(
                limit,
                page,
                dir,
                sort,
                inputName
            );
            return res.status(200).send({
                data: {
                    benefits: result.timeLeaveBenefits,
                },
                metadata: {
                    code: 'SUCCESS',
                    message: 'Success',
                    pagination: result.pagination,
                },
            });
        } catch (error: any) {
            console.log(error.message);
            return res.status(400).send({
                data: {},
                metadata: {
                    code: ERROR_CODE.HTTP_STATUS_ERROR,
                    message: error.message,
                },
            });
        }
    }

    @Get('/header')
    async getHeader(@Req() req: Request, @Res() res: Response) {
        try {
            const column = [
                {
                    title: 'NAME',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'STANDARD LEAVE',
                    dataIndex: 'standardLeave',
                    key: 'standardLeave',
                },
                {
                    title: 'TYPE',
                    dataIndex: 'benefitTypeCode',
                    key: 'benefitTypeCode',
                },
                {
                    title: 'STATUS',
                    dataIndex: 'status',
                    key: 'status',
                },
            ];
            return res.status(200).send({
                data: {
                    header: column,
                },
                metadata: {
                    code: 'SUCCESS',
                    message: 'Success'
                }
            })
        } catch (error:any) {
            console.log(error.message);
            return res.status(400).send({
                data: {},
                metadata: {
                    code: ERROR_CODE.HTTP_STATUS_ERROR,
                    message: error.message,
                },
            });
        }

    }

    @Get('/:uid')
    // @GET
    @Path(':uid')
    async getLeaveBenefitByUid(@Req() req: Request, @Res() res: Response) {
        try {
            const uid: string = req.params.uid;
            const result = await this.timeLeaveBenefitService.getLeaveBenefitByUid(
                uid
            );
            return res.send({
                data: {
                    benefit: result,
                },
                metadata: {
                    code: 'SUCCESS',
                    message: 'Success',
                },
            });
        } catch (error: any) {
            console.log(error.message);
            return res.status(400).send({
                data: {},
                metadata: {
                    code: ERROR_CODE.HTTP_STATUS_ERROR,
                    message: error.message,
                },
            });
        }
    }

    @Put('/edit-status')
    async editStatus(@Body() body: any, @Res() res: Response) {
        try {
            console.log(body);
            const uid: string = body.uid;
            const status: number = parseInt(body.status);
            const result = await this.timeLeaveBenefitService.updateStatusById(
                uid,
                status
            );
            return res.send({
                data: result,
                metadata: {
                    code: 'SUCCESS',
                    message: 'Success',
                },
            });
        } catch (error: any) {
            console.log(error.message);
            return res.status(400).send({
                data: {},
                metadata: {
                    code: ERROR_CODE.HTTP_STATUS_ERROR,
                    message: error.message,
                },
            });
        }
    }

    @Put('/:uid')
    async edit(
        @Param('uid') uid: string,
        @Body() updateTimeLeaveBenefitInputDto: IUpdateTimeLeaveBenefit,
        @Res() res: Response
    ) {
        try {
            const result = await this.timeLeaveBenefitService.update(
                uid,
                updateTimeLeaveBenefitInputDto
            );
            return res.send({
                data: result,
                metadata: {
                    code: 'SUCCESS',
                    message: 'Success',
                },
            });
        } catch (error: any) {
            console.log(error.message);
            return res.status(400).send({
                data: {},
                metadata: {
                    code: ERROR_CODE.HTTP_STATUS_ERROR,
                    message: error.message,
                },
            });
        }
    }

    @Delete('/:uid')
    async delete(@Req() req: Request, @Res() res: Response) {
        try {
            const uid: string = req.params.uid;
            const result = await this.timeLeaveBenefitService.deleteById(uid);
            return res.status(200).send({
                data: result,
                metadata: {
                    code: 'SUCCESS',
                    message: 'Success',
                },
            });
        } catch (error: any) {
            console.log(error.message);
            return res.status(400).send({
                data: {},
                metadata: {
                    code: ERROR_CODE.HTTP_STATUS_ERROR,
                    message: error.message,
                },
            });
        }
    }
}
