import { CreateLeaveManagementInputDto } from './dto/leaveManagementDto';
import { ERROR_CODE } from './../../core/constants/errorMessage';
import { LeaveManagementService } from './leaveManagementService';
import { Request, Response } from 'express';
import Container, { Service, Inject } from 'typedi';
import {
  JsonController,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Req,
  Res,
} from 'routing-controllers';
import { GET, Path, PathParam, POST } from 'typescript-rest';



@Service('LeaveManagementController')
@JsonController('leave-management')
@Path('leave-management')
export default class LeaveManagementController {
  private readonly timeLeaveBenefitService: LeaveManagementService =
    Container.get(LeaveManagementService);

  @Post('/create')
  async create(
    @Body() body: CreateLeaveManagementInputDto,
    @Res() res: Response
  ) {
    try {
      const employeeId: string = body.employeeId;
      const timeLeaveBenefitId: string = body.timeLeaveBenefitId;
      const result = await this.timeLeaveBenefitService.createNew(
        employeeId,
        timeLeaveBenefitId
      );
      return res.status(200).send({
        data: result,
        metadata: {
          code: 'SUCCESS',
          message: 'success',
        },
      });
    } catch (error: any) {
      return res.status(400).send({
        data: {},
        metadata: {
          code: ERROR_CODE.HTTP_STATUS_ERROR,
          message: error.message,
        },
      });
    }
  }

  @Get()
  async getList(@Req() req: Request, @Res() res: Response) {
    try {
        console.log("aao ne")
      const limit: number = req.query.limit ? Number(req.query.limit) : 10;
      const page: number = req.query.page ? Number(req.query.page) : 1;
      const dir: string = req.query.dir ? req.query.dir.toString() : 'DESC';
      const sort: string = req.query.sort
        ? req.query.sort.toString()
        : 'name';
        const name: string = req.query.name ? req.query.name.toString() : '';
        const benefit: string = req.query.benefit ? req.query.benefit.toString() : '';
      const result = await this.timeLeaveBenefitService.getList(
        limit,
        page,
        dir,
        sort,
        name,
        benefit

      );
      return res.status(200).send({
        data: {
          leaves: result,
        },
        metadata: {
          code: 'SUCCESS',
          message: 'success',
          pagination: result,
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
