import { Controller, Post, Body, Get, Query, Patch, Param } from '@nestjs/common';
import { LoadsService } from './loads.service';

@Controller('loads')
export class LoadsController {
  constructor(private readonly loadsService: LoadsService) {}

  @Post()
  async create(@Body() body: { reference: string; carrierId: string }) {
    return this.loadsService.createLoad(body);
  }

  @Post('assign')
  async assign(@Body() body: { loadId: string; driverId: string; truckId: string }) {
    return this.loadsService.assignLoad(body);
  }

  @Get('board')
  async getBoard(@Query('carrierId') carrierId: string) {
    return this.loadsService.findBoard(carrierId);
  }

  /**
   * ✅ The "Status Trigger"
   */
  @Patch('assignment/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string
  ) {
    return this.loadsService.updateStatus(id, status as any);
  }
}