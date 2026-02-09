import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  create(@Body() dto: { loadId: string; driverId: string; truckId: string }) {
    return this.assignmentsService.create(dto);
  }

  @Get()
  findAll(@Query('carrierId') carrierId: string) {
    return this.assignmentsService.findByCarrier(carrierId);
  }
}