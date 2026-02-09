import { Body, Controller, Get, Post } from '@nestjs/common';
import { DispatchService } from './dispatch.service';

@Controller('dispatch')
export class DispatchController {
  constructor(private readonly dispatchService: DispatchService) {}

  @Get('ping')
  ping() {
    return { ok: true, module: 'dispatch' };
  }

  @Post('assign')
  assign(@Body() body: {
    loadId: string;
    driverId: string;
    truckId: string;
    assignedByUserId?: string;
    note?: string;
  }) {
    if (!body?.loadId || !body?.driverId || !body?.truckId) {
      return { ok: false, error: 'Missing required fields: loadId, driverId, truckId' };
    }
    return this.dispatchService.assign(body);
  }
}
