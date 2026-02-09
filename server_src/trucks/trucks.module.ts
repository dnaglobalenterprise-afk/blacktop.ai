import { Module } from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { TrucksController } from './trucks.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Import the DB connection

@Module({
  imports: [PrismaModule], // Inject the DB connection
  controllers: [TrucksController],
  providers: [TrucksService],
})
export class TrucksModule {}