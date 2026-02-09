import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoadStatus } from '@prisma/client';

@Injectable()
export class LoadsService {
  constructor(private prisma: PrismaService) {}

  async createLoad(data: { reference: string; carrierId: string }) {
    return this.prisma.load.create({
      data: {
        reference: data.reference,
        status: LoadStatus.CREATED,
        carrier: { connect: { id: data.carrierId } },
      },
    });
  }

async assignLoad(dto: { loadId: string; driverId: string; truckId: string }) {
  const assignment = await this.prisma.assignment.create({
    data: {
      loadId: dto.loadId,
      driverId: dto.driverId,
      truckId: dto.truckId,
      status: 'ASSIGNED' as any,
    },
  });

  await this.prisma.load.update({
    where: { id: dto.loadId },
    data: { status: 'ASSIGNED' as any, updatedAt: new Date() },
  });

  return assignment;
}

async updateLoadStatus(loadId: string, status: LoadStatus) {
    const updatedLoad = await this.prisma.load.update({
      where: { id: loadId },
      data: { status },
      include: { customer: true, carrier: true }
    });

    // 🤖 AI TRIGGER: Create a notification for the Agent
    if (status === LoadStatus.DELIVERED) {
      console.log(`🤖 AGENT ACTION: Sending delivery confirmation to ${updatedLoad.customer?.email}`);
      // In a real app, this would trigger your SendGrid/Email agent
    }

    if (status === LoadStatus.DELAYED) {
      console.log(`🚨 ALERT: Notifying Dispatcher - Load ${updatedLoad.reference} is running late.`);
    }

    return updatedLoad;
  }
async getAiRecommendation(loadId: string) {
  const load = await this.prisma.load.findUnique({ where: { id: loadId } });
  if (!load) throw new NotFoundException('Load not found');

  const availableDrivers = await this.prisma.driver.findMany({
    where: { active: true, type: 'COMPANY' } // Example: Only suggest company drivers
  });

  // Here is where your Agent logic kicks in:
  // It filters drivers by proximity, remaining hours, and on-time rating.
  const recommendation = availableDrivers
    .sort((a, b) => (b.onTimeCount || 0) - (a.onTimeCount || 0))[0];

  return {
    loadReference: load.reference,
    suggestedDriver: recommendation?.name ?? null,
    reasoning: recommendation
      ? `Selected ${recommendation.name} due to ${recommendation.onTimeCount} on-time deliveries and zero safety incidents.`
      : 'No suitable driver found'
  };
}

  /**
   * ✅ Update Status: Moves the load from ASSIGNED -> DISPATCHED -> IN_TRANSIT -> DELIVERED
   */
  async updateStatus(assignmentId: string, newStatus: LoadStatus) {
    const assignment = await this.prisma.assignment.update({
      where: { id: assignmentId },
      data: { status: newStatus },
    });

    // Mirror the status to the Load table so the Dispatch Board stays accurate
    await this.prisma.load.update({
      where: { id: assignment.loadId },
      data: { status: newStatus, updatedAt: new Date() },
    });

    return assignment;
  }

  async findBoard(carrierId: string) {
    return this.prisma.load.findMany({
      where: { carrierId },
      include: {
        Assignment: {
          include: {
            Driver: { select: { name: true, phone: true } },
            Truck: { select: { unitNumber: true } }
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });
  }
}