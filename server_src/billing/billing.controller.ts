import { Controller, Get, Query } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('invoice')
  async getInvoice(
    @Query('loadId') loadId: string,
    @Query('base') base: number,
    @Query('detention') detention?: number,
    @Query('lumper') lumper?: number
  ) {
    return this.billingService.generateInvoice(
      loadId, 
      Number(base), 
      Number(detention || 0), 
      Number(lumper || 0)
    );
  }
}