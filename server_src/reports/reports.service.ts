import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  /**
   * 🤖 The AI Priority List
   * This is the "Hit List" for your Agent.
   */
  async getAgentPriorityList(carrierId: string) {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    // 1. Find drivers with expiring medical cards (Critical)
    const expiringDrivers = await this.prisma.driver.findMany({
      where: {
        carrierId,
        dotPhysicalExpiry: { lte: sevenDaysFromNow },
      },
    });

    // 2. Find loads that are stuck (No updates in 2 hours)
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const stalledLoads = await (this.prisma as any).assignment.findMany({
      where: {
        status: 'IN_TRANSIT',
        updatedAt: { lte: twoHoursAgo },
      },
      include: { driver: true, load: true },
    });

    return {
      summary: {
        totalAlerts: expiringDrivers.length + stalledLoads.length,
        systemStatus: expiringDrivers.length > 0 ? 'NEEDS_ATTENTION' : 'HEALTHY',
      },
      tasks: [
        ...expiringDrivers.map((d) => ({
          type: 'COMPLIANCE',
          severity: 'HIGH',
          message: `Driver ${d.name} has a medical card expiring on ${d.dotPhysicalExpiry?.toLocaleDateString() ?? 'unknown'}.`,
          action: 'REQUEST_DOCUMENTS',
        })),
        ...stalledLoads.map((s: any) => ({
          type: 'TRACKING',
          severity: 'MEDIUM',
          message: `Load ${s.load.reference} with ${s.driver.name} has not moved in 2 hours.`,
          action: 'PING_DRIVER',
        })),
      ],
    };
  }

  /**
   * 📈 Fleet Performance Overview
   */
  async getFleetStats(carrierId: string) {
    const drivers = await this.prisma.driver.findMany({
      where: { carrierId },
    });

    const totalIncidents = drivers.reduce((sum, d) => sum + (d.incidents || 0), 0);
    const onTimeRate = drivers.length > 0 
      ? (drivers.reduce((sum, d) => sum + (d.onTimeCount || 0), 0) / 
         (drivers.reduce((sum, d) => sum + (d.onTimeCount || 0) + (d.lateCount || 0), 0) || 1)) * 100 
      : 100;

    return {
      totalDrivers: drivers.length,
      fleetIncidents: totalIncidents,
      onTimePercentage: Math.round(onTimeRate),
    };
  }
}