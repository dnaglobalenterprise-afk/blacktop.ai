import { Controller, Get, Query } from '@nestjs/common';
import { PayoutsService } from './payouts.service';

@Controller('payouts')
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Get('calculate')
  async getCalculation(
    @Query('method') method: 'percentage' | 'mileage',
    @Query('gross') gross?: number,
    @Query('pct') pct?: number,
    @Query('lMiles') lMiles?: number,
    @Query('lRate') lRate?: number,
    @Query('dMiles') dMiles?: number,
    @Query('dRate') dRate?: number,
  ) {
    if (method === 'percentage') {
      return this.payoutsService.calculatePercentagePayout(Number(gross), Number(pct));
    } else {
      return this.payoutsService.calculateMileagePayout(
        Number(lMiles), Number(lRate), Number(dMiles), Number(dRate)
      );
    }
  }
}