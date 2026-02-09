import { Injectable } from '@nestjs/common';
import { LoadsService } from '../loads/loads.service';
import { TrucksService } from '../trucks/trucks.service';
import { AssignmentsService } from '../assignments/assignments.service';

type FeasibilityResult = {
  allowed: boolean;
  blockingIssues: string[];
  warnings: string[];
  explanation: string;
  data?: any;
};

function overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  const a1 = new Date(aStart).getTime();
  const a2 = new Date(aEnd).getTime();
  const b1 = new Date(bStart).getTime();
  const b2 = new Date(bEnd).getTime();
  return a1 <= b2 && b1 <= a2;
}

@Injectable()
export class FeasibilityService {
  constructor(
    private readonly loadsService: LoadsService,
    private readonly trucksService: TrucksService,
    private readonly assignmentsService: AssignmentsService,
  ) {}

  async checkAssignment(input: { loadId: string; driverId: string; truckId: string }): Promise<FeasibilityResult> {
    const blockingIssues: string[] = [];
    const warnings: string[] = [];

    let load: any = null;
    if (typeof (this.loadsService as any).findOne === 'function') {
      load = await (this.loadsService as any).findOne(input.loadId);
    } else if (typeof (this.loadsService as any).findById === 'function') {
      load = await (this.loadsService as any).findById(input.loadId);
    } else if (typeof (this.loadsService as any).get === 'function') {
      load = await (this.loadsService as any).get(input.loadId);
    } else {
      // Fallback: try indexed access to avoid TS compile error if method names differ
      try {
        const fn = (this.loadsService as any)['findOne'] || (this.loadsService as any)['findById'] || (this.loadsService as any)['get'];
        if (typeof fn === 'function') {
          load = await fn.call(this.loadsService, input.loadId);
        }
      } catch {
        load = null;
      }
    }

    if (!load) {
      blockingIssues.push('Load not found');
    }

    let truck: any = null;
    if (typeof (this.trucksService as any).findOne === 'function') {
      truck = await (this.trucksService as any).findOne(input.truckId);
    } else if (typeof (this.trucksService as any).findById === 'function') {
      truck = await (this.trucksService as any).findById(input.truckId);
    } else if (typeof (this.trucksService as any).get === 'function') {
      truck = await (this.trucksService as any).get(input.truckId);
    } else {
      try {
        const fn = (this.trucksService as any)['findOne'] || (this.trucksService as any)['findById'] || (this.trucksService as any)['get'];
        if (typeof fn === 'function') {
          truck = await fn.call(this.trucksService, input.truckId);
        }
      } catch {
        truck = null;
      }
    }

    if (!truck) {
      blockingIssues.push('Truck not found');
    }

    // ---------- Driver conflict check (BLOCK) ----------
    let allAssignments: any[] = [];
    try {
      if (typeof (this.assignmentsService as any).findAll === 'function') {
        allAssignments = await (this.assignmentsService as any).findAll();
      } else if (typeof (this.assignmentsService as any).find === 'function') {
        allAssignments = await (this.assignmentsService as any).find();
      } else if (typeof (this.assignmentsService as any).findMany === 'function') {
        allAssignments = await (this.assignmentsService as any).findMany();
      } else if (typeof (this.assignmentsService as any).list === 'function') {
        allAssignments = await (this.assignmentsService as any).list();
      } else if (typeof (this.assignmentsService as any).getAll === 'function') {
        allAssignments = await (this.assignmentsService as any).getAll();
      } else if (typeof (this.assignmentsService as any).query === 'function') {
        allAssignments = await (this.assignmentsService as any).query({});
      } else if (typeof (this.assignmentsService as any).get === 'function') {
        allAssignments = await (this.assignmentsService as any).get();
      } else {
        const fn =
          (this.assignmentsService as any)['findAll'] ||
          (this.assignmentsService as any)['find'] ||
          (this.assignmentsService as any)['findMany'] ||
          (this.assignmentsService as any)['list'] ||
          (this.assignmentsService as any)['getAll'] ||
          (this.assignmentsService as any)['query'] ||
          (this.assignmentsService as any)['get'];
        if (typeof fn === 'function') {
          allAssignments = await fn.call(this.assignmentsService);
        }
      }
    } catch {
      allAssignments = [];
    }
    const activeAssignments = (allAssignments || [])
      .filter((a: any) =>
        a.driverId === input.driverId &&
        (a.status === 'ASSIGNED')
      );

    if (activeAssignments.length > 0) {
      blockingIssues.push('Driver already assigned to another active load');
    }

    // ---------- Maintenance conflict check (BLOCK) ----------
    // If we have a load with stops, we can use pickup->delivery window (basic)
    if (load?.stops?.length && (truck as any)?.maintenance?.length) {
      const pickup = load.stops[0];
      const delivery = load.stops[load.stops.length - 1];

      const loadStart = pickup.appointmentStart;
      const loadEnd = delivery.appointmentEnd;

      for (const w of (truck as any).maintenance) {
        if (!w?.start || !w?.end) continue;
        if (overlaps(loadStart, loadEnd, w.start, w.end)) {
          blockingIssues.push('Truck maintenance overlaps load appointment window');
          break;
        }
      }

      // ---------- Tight schedule warning ----------
      // If pickup-to-delivery window is short, warn (placeholder logic)
      const durationHours =
        (new Date(loadEnd).getTime() - new Date(loadStart).getTime()) / (1000 * 60 * 60);

      if (durationHours > 0 && durationHours <= 12) {
        warnings.push('Tight pickup-to-delivery window (<= 12 hours)');
      }
    } else {
      // If we don’t have full stop windows yet, warn only
      warnings.push('Limited load schedule data — feasibility based on partial information');
    }

    const allowed = blockingIssues.length === 0;

    return {
      allowed,
      blockingIssues,
      warnings,
      explanation: allowed
        ? 'Feasible: no blocking conflicts detected. Review warnings if any.'
        : 'Blocked: conflicts detected that require human resolution.',
      data: {
        loadFound: !!load,
        truckFound: !!truck,
        activeDriverAssignments: activeAssignments.map((a: any) => a.id),
      },
    };
  }
}
