import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CarriersService } from './carriers.service';

@Controller('carriers')
export class CarriersController {
  constructor(private readonly carriersService: CarriersService) {}

  @Get('ping')
  ping() {
    return { ok: true, status: 'Carriers module is live' };
  }

  @Post()
  async create(@Body() body: { id: string; name: string; dotNumber: string; email?: string }) {
    const carrier = await this.carriersService.create(body);
    return { ok: true, carrier };
  }

  @Get()
  async findAll() {
    const carriers = await this.carriersService.findAll();
    return { ok: true, carriers };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const carrier = await this.carriersService.findOne(id);
    return { ok: true, carrier };
  }
}