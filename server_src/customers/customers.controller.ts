import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() dto: { 
    name: string; 
    mcNumber?: string; 
    creditLimit: number; 
    carrierId: string;
    notes?: string;
  }) {
    return this.customersService.create(dto);
  }

  @Get()
  async findAll(@Query('carrierId') carrierId: string) {
    return this.customersService.findAll(carrierId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }
}