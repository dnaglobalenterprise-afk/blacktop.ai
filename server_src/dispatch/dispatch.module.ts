import { Module } from '@nestjs/common';
import { DispatchController } from './dispatch.controller';
import { DispatchService } from './dispatch.service';

import { FeasibilityService } from '../feasibility/feasibility.service';
import { LoadsService } from '../loads/loads.service';
import { TrucksService } from '../trucks/trucks.service';
import { AssignmentsService } from '../assignments/assignments.service';

@Module({
  controllers: [DispatchController],
  providers: [
    DispatchService,
    FeasibilityService,
    LoadsService,
    TrucksService,
    AssignmentsService,
  ],
})
export class DispatchModule {}
