import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrucksService {
  constructor(private prisma: PrismaService) {}

  /**
   * ✅ Create a new Truck
   */
  async create(dto: { number: string; vin: string; carrierId: string }) {
    return this.prisma.truck.create({
      data: {
        unitNumber: dto.number,
        vin: dto.vin,
        updatedAt: new Date(),
        carrier: { connect: { id: dto.carrierId } }
      },
    });
  }

  /**
   * ✅ Find Trucks NOT on an active assignment
   */
  async findAvailable(carrierId: string) {
    return this.prisma.truck.findMany({
      where: {
        carrierId,
        active: true,
        Assignment: {
          none: {
            OR: [
              { status: 'ASSIGNED' },
              { status: 'DISPATCHED' },
              { status: 'IN_TRANSIT' }
            ]
          }
        }
      }
    });
  }

  /**
   * ✅ List all trucks for a carrier
   */
  async findAll(carrierId: string) {
    return this.prisma.truck.findMany({ where: { carrierId } });
  }

  /**
   * ✅ Update GPS Coordinates
   */
  async updateLocation(id: string, lat: number, lng: number) {
    const truck = await this.prisma.truck.findUnique({ where: { id } });
    if (!truck) throw new NotFoundException(`Truck ${id} not found`);

    return await this.prisma.truck.update({
      where: { id },
      data: {
        lastLat: lat,
        lastLng: lng,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * ✅ Find a specific truck
   */
  async findOne(id: string) {
    const truck = await this.prisma.truck.findUnique({ where: { id } });
    if (!truck) throw new NotFoundException(`Truck with ID ${id} not found`);
    return truck;
  }
}