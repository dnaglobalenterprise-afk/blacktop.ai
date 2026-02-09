import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { TrucksService } from './trucks.service';

@Controller('trucks')
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @Post()
  async create(@Body() dto: { number: string; vin: string; carrierId: string }) {
    return this.trucksService.create(dto);
  }

  @Get('available')
  async findAvailable(@Query('carrierId') carrierId: string) {
    return this.trucksService.findAvailable(carrierId);
  }

  @Get()
  async findAll(@Query('carrierId') carrierId: string) {
    return this.trucksService.findAll(carrierId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trucksService.findOne(id);
  }

  /**
   * ✅ GPS Update Endpoint
   */
  @Patch(':id/location')
  async updateLocation(
    @Param('id') id: string,
    @Body() body: { lat: number; lng: number }
  ) {
    return this.trucksService.updateLocation(id, body.lat, body.lng);
  }
}