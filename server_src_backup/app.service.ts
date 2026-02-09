import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async globalSearch(query: string) {
    const drivers = await this.prisma.driver.findMany({ where: { name: { contains: query, mode: 'insensitive' } } });
    const loads = await this.prisma.load.findMany({ where: { reference: { contains: query, mode: 'insensitive' } } });
    const customers = await this.prisma.customer.findMany({ where: { name: { contains: query, mode: 'insensitive' } } });

    return { drivers, loads, customers };
  }
}