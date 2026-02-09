import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  /**
   * ✅ Generate Invoice Summary
   */
  async generateInvoice(loadId: string, baseRate: number, detention: number = 0, lumper: number = 0) {
    const load = await this.prisma.load.findUnique({
      where: { id: loadId },
      include: { carrier: true }
    });

    if (!load) throw new NotFoundException('Load not found');

    const totalInvoice = baseRate + detention + lumper;

    return {
      invoiceNumber: `INV-${load.reference}`,
      date: new Date().toISOString().split('T')[0],
      carrier: load.carrier.name,
      loadReference: load.reference,
      lineItems: [
        { description: 'Linehaul', amount: baseRate.toFixed(2) },
        { description: 'Detention', amount: detention.toFixed(2) },
        { description: 'Lumper/Misc', amount: lumper.toFixed(2) }
      ],
      totalAmount: totalInvoice.toFixed(2),
      status: 'PENDING_FACTORING'
    };
  }
}