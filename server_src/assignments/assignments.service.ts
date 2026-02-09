import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { loadId: string; driverId: string; truckId: string }) {
    return this.prisma.assignment.create({
      data: {
        loadId: data.loadId,
        driverId: data.driverId,
        truckId: data.truckId,
        status: 'ASSIGNED',
      },
      include: {
        Load: true,
        Driver: true,
        Truck: true,
      }
    });
  }

  async findByCarrier(carrierId: string) {
    return this.prisma.assignment.findMany({
      where: {
        Load: { carrierId: carrierId }
      },
      include: {
        Load: true,
        Driver: true,
        Truck: true
      }
    });
  }
}