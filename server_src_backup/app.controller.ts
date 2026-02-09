import { Controller, Get, Post, Body, OnModuleInit, Param, Query } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller()
export class AppController implements OnModuleInit {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async onModuleInit() {
    console.log("DOM: Building Master TMS Database Architecture...");
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. EQUIPMENT LAYER (Trucks & Trailers)
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS equipment (
          id SERIAL PRIMARY KEY,
          unit_number VARCHAR(50) UNIQUE,
          vin VARCHAR(100),
          make VARCHAR(50),
          model VARCHAR(50),
          year INT,
          type VARCHAR(20),
          status VARCHAR(20) DEFAULT 'ACTIVE',
          last_pm_date DATE,
          next_pm_due DATE,
          current_lat DECIMAL,
          current_lng DECIMAL
        );
      `);

      // 2. DRIVER LAYER
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS drivers (
          id SERIAL PRIMARY KEY,
          full_name VARCHAR(100),
          phone VARCHAR(20),
          license_number VARCHAR(50),
          license_exp DATE,
          med_card_exp DATE,
          assigned_unit VARCHAR(50),
          status VARCHAR(20) DEFAULT 'AVAILABLE'
        );
      `);

      // 3. LOAD & OPERATIONS LAYER
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS loads (
          id SERIAL PRIMARY KEY,
          load_number VARCHAR(50) UNIQUE,
          customer_name VARCHAR(100),
          reference_number VARCHAR(100),
          status VARCHAR(20) DEFAULT 'AVAILABLE',
          pickup_loc VARCHAR(200),
          pickup_appt TIMESTAMP,
          delivery_loc VARCHAR(200),
          delivery_appt TIMESTAMP,
          rate DECIMAL(10,2),
          weight INT,
          driver_id INT,
          equipment_id INT
        );
      `);

      // 4. MAINTENANCE LOGS
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS maintenance_logs (
          id SERIAL PRIMARY KEY,
          unit_number VARCHAR(50),
          service_date DATE,
          service_type VARCHAR(100),
          odometer INT,
          cost DECIMAL(10,2),
          notes TEXT,
          performed_by VARCHAR(100)
        );
      `);

      // 5. ACCOUNTING & INVOICING
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS invoices (
          id SERIAL PRIMARY KEY,
          load_id INT,
          customer_id INT,
          invoice_number VARCHAR(50) UNIQUE,
          amount DECIMAL(10,2),
          status VARCHAR(20) DEFAULT 'PENDING',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // 6. DOCUMENT VAULT
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS documents (
          id SERIAL PRIMARY KEY,
          entity_type VARCHAR(20),
          entity_id INT,
          doc_type VARCHAR(50),
          file_url TEXT,
          uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // 7. ELD COMPLIANCE
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS eld_logs (
          id SERIAL PRIMARY KEY,
          driver_id INT,
          log_date DATE,
          on_duty_hours DECIMAL(4,2),
          driving_hours DECIMAL(4,2),
          violation_flags TEXT,
          audit_status VARCHAR(20) DEFAULT 'CLEAN'
        );
      `);

      console.log("DOM: TMS Foundation Ready. All Layers Initialized.");
    } catch (e) {
      console.error("CRITICAL: Foundation Build Failed ->", e.message);
    } finally {
      await queryRunner.release();
    }
  }

  // --- UNIVERSAL QUERY ENGINE ---

  @Get('terminal-sync')
  async getFullSync() {
    const loads = await this.dataSource.query(`SELECT * FROM loads`);
    const drivers = await this.dataSource.query(`SELECT * FROM drivers`);
    const equipment = await this.dataSource.query(`SELECT * FROM equipment`);
    return { ok: true, loads, drivers, equipment };
  }

  @Get('search-equipment')
  async searchEquip(@Query('q') q: string) {
    return await this.dataSource.query(
      `SELECT * FROM equipment WHERE unit_number ILIKE $1 OR vin ILIKE $1`, [`%${q}%`]
    );
  }

  @Get('load-history')
  async getLoadHistory(@Query('ref') ref: string) {
    return await this.dataSource.query(
      `SELECT * FROM loads WHERE load_number ILIKE $1 OR reference_number ILIKE $1`, [`%${ref}%`]
    );
  }

  @Post('add-load')
  async addLoad(@Body() d: any) {
    await this.dataSource.query(
      `INSERT INTO loads (load_number, customer_name, reference_number, pickup_loc, delivery_loc, rate, weight) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [d.load_number, d.customer, d.ref, d.pickup, d.delivery, d.rate, d.weight]
    );
    return { ok: true };
  }
}