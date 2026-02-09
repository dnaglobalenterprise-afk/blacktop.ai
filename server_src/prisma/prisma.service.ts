import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool, defaults } from 'pg'; // Add defaults
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

// Force the underlying pg library to allow unauthorized TCL/SSL globally
// @ts-ignore
defaults.ssl = { rejectUnauthorized: false };

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // Add trailing comma
      // Add these three lines to handle AWS RDS connection stability:
      max: 3,                 // Reduce pool size for stability
      connectionTimeoutMillis: 10000, // Fail fast if it can't connect
      idleTimeoutMillis: 30000,      // Close idle connections
      allowExitOnIdle: true,
  keepAlive: true,
    });

    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ AWS RDS Handshake Successful');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
