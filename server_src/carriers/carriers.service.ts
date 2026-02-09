import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarriersService {
  constructor(private prisma: PrismaService) {}

  /**
   * ✅ Creates a new Carrier/Company
   */
  async create(data: { id: string; name: string; dotNumber: string; email?: string }) {
    // Check if the ID (like 'defy-trans-01') already exists
    const existing = await this.prisma.carrier.findUnique({
      where: { id: data.id },
    });

    if (existing) {
      throw new ConflictException(`Carrier with ID ${data.id} already exists`);
    }

    // Prisma model doesn't have an 'email' field; only pass known properties
    return await this.prisma.carrier.create({
      data: {
        id: data.id,
        name: data.name,
        dotNumber: data.dotNumber,
      },
    });
  }

  /**
   * ✅ Gets all Carriers in the system
   */
  async findAll() {
    return await this.prisma.carrier.findMany({
      include: {
        _count: {
          select: { drivers: true, trucks: true, loads: true },
        },
      },
    });
  }

/**
 * ✅ Gets a specific Carrier's profile
 */
async findOne(id: string) {
  const carrier = await this.prisma.carrier.findUnique({
    where: { id },
    include: {
      drivers: true,
      trucks: true,
    },
  });

  if (!carrier) throw new NotFoundException(`Carrier ${id} not found`);
  return carrier;
}
}