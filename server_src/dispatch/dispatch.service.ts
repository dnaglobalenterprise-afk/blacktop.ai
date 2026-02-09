import { Injectable } from '@nestjs/common';
import { FeasibilityService } from '../feasibility/feasibility.service';
import { AssignmentsService } from '../assignments/assignments.service';

@Injectable()
export class DispatchService {
  constructor(
    private readonly feasibilityService: FeasibilityService,
    private readonly assignmentsService: AssignmentsService,
  ) {}

  async assign(input: {
    loadId: string;
    driverId: string;
    truckId: string;
    assignedByUserId?: string;
    note?: string;
  }) {
    const feasibility = this.feasibilityService.checkAssignment({
      loadId: input.loadId,
      driverId: input.driverId,
      truckId: input.truckId,
    });

    if (!(await feasibility).allowed) {
      return {
        ok: false,
        action: 'BLOCKED',
        feasibility,
        message: 'Assignment blocked by feasibility rules.',
      };
    }

    const assignment = this.assignmentsService.create({
      loadId: input.loadId,
      driverId: input.driverId,
      truckId: input.truckId,
      status: 'ASSIGNED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: [
        {
          timestamp: new Date().toISOString(),
          updatedByUserId: input.assignedByUserId || 'u_owner_001',
          note:
            input.note ||
            `Assigned via dispatch. Feasibility OK. Warnings: ${(await feasibility).warnings.join('; ') || 'none'}`,
        },
      ],
    } as any);

    return {
      ok: true,
      action: 'ASSIGNED',
      assignment,
      feasibility,
    };
  }
}
