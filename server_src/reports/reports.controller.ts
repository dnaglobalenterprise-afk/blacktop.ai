import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('priority')
  async getPriority(@Query('carrierId') carrierId: string) {
    return this.reportsService.getAgentPriorityList(carrierId);
  }

  @Get('stats')
  async getStats(@Query('carrierId') carrierId: string) {
    return this.reportsService.getFleetStats(carrierId);
  }
}