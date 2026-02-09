import { Body, Controller, Post } from '@nestjs/common';
import { FeasibilityService } from './feasibility.service';

@Controller('feasibility')
export class FeasibilityController {
  constructor(private readonly feasibilityService: FeasibilityService) {}

  @Post('assignment')
  check(@Body() body: {
    loadId: string;
    driverId: string;
    truckId: string;
    hasDriverConflict?: boolean;
    hasTruckMaintenance?: boolean;
    tightSchedule?: boolean;
  }) {
    return this.feasibilityService.checkAssignment(body);
  }
}
