import { Module } from '@nestjs/common';
import { FeasibilityService } from './feasibility.service';
import { FeasibilityController } from './feasibility.controller';

import { LoadsService } from '../loads/loads.service';
import { TrucksService } from '../trucks/trucks.service';
import { AssignmentsService } from '../assignments/assignments.service';

@Module({
  controllers: [FeasibilityController],
  providers: [
    FeasibilityService,
    LoadsService,
    TrucksService,
    AssignmentsService,
  ],
})
export class FeasibilityModule {}
