import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PayoutsService {
  constructor(private prisma: PrismaService) {}

  /**
   * ✅ Calculate Payout based on Percentage of Gross
   */
  calculatePercentagePayout(gross: number, percentage: number) {
    const driverPay = gross * (percentage / 100);
    return {
      type: 'PERCENTAGE',
      gross,
      rate: `${percentage}%`,
      driverPay: driverPay.toFixed(2),
      companyNet: (gross - driverPay).toFixed(2),
    };
  }

  /**
   * ✅ Calculate Payout based on Mileage
   */
  calculateMileagePayout(
    loadedMiles: number, 
    loadedRate: number, 
    deadheadMiles: number, 
    deadheadRate: number
  ) {
    const loadedPay = loadedMiles * loadedRate;
    const deadheadPay = deadheadMiles * deadheadRate;
    const totalPay = loadedPay + deadheadPay;

    return {
      type: 'MILEAGE',
      loadedPay: loadedPay.toFixed(2),
      deadheadPay: deadheadPay.toFixed(2),
      totalDriverPay: totalPay.toFixed(2),
      breakdown: {
        loaded: `${loadedMiles} @ $${loadedRate}`,
        deadhead: `${deadheadMiles} @ $${deadheadRate}`
      }
    };
  }
}