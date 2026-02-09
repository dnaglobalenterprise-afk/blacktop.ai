import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  /**
   * ✅ Create a Broker or Direct Customer
   */
  async create(dto: { 
    name: string; 
    mcNumber?: string; 
    creditLimit: any;
    carrierId: string;
    notes?: string;
  }) {
    return (this.prisma as any).customer.create({
      data: {
        name: dto.name,
        mcNumber: dto.mcNumber,
        creditLimit: parseFloat(dto.creditLimit), // ✅ Force it to be a number
        carrierId: dto.carrierId,
        notes: dto.notes
      }
    });
  }

  /**
   * ✅ List all Customers/Brokers for this Carrier
   */
  async findAll(carrierId: string) {
    return (this.prisma as any).customer.findMany({
      where: { carrierId },
      orderBy: { name: 'asc' }
    });
  }

  /**
   * ✅ Find specific customer details (for credit checks)
   */
  async findOne(id: string) {
    const customer = await (this.prisma as any).customer.findUnique({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }
  async getCreditReport(customerId: string) {
    const customer = await this.prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) return null;

    // AI/Logic: derive a status from existing fields (creditLimit and daysToPay)
    const isAtRisk = customer.creditLimit < 1000 || customer.daysToPay > 60;
    const status = isAtRisk ? 'BLOCKED' : 'OK';

    return {
      name: customer.name,
      limit: customer.creditLimit,
      status: status,
      riskLevel: isAtRisk ? 'HIGH' : 'LOW',
      notes: customer.notes
    };
  }
}