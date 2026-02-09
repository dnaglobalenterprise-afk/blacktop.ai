import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'blacktop-tms-db.c7ks8u448hx1.us-east-2.rds.amazonaws.com',
      port: 5432,
      username: 'blacktop_admin',
      password: 'Kingstown2022', // <--- Use your actual RDS password here
      database: 'Blacktop_tms',
      entities: [],
      synchronize: false,
      retryAttempts: 1,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}