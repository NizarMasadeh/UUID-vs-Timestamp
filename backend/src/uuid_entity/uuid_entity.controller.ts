import { Controller, Post, Get, Delete, Body, Query } from '@nestjs/common';
import { UuidEntity } from './entities/uuid_entity.entity';
import { UuidEntityService } from './uuid_entity.service';


@Controller('uuid-entity')
export class UuidEntityController {
  constructor(private readonly uuidEntityService: UuidEntityService) { }

  @Post()
  async create(): Promise<UuidEntity> {
    return this.uuidEntityService.create();
  }

  @Post('batch')
  async createBatch(@Query('count') count: number = 100) {
    return this.uuidEntityService.createBatch(count);
  }

  @Get()
  async findAll(): Promise<UuidEntity[]> {
    return this.uuidEntityService.findAll();
  }

  @Get('count')
  async count(): Promise<{ count: number }> {
    const count = await this.uuidEntityService.count();
    return { count };
  }

  @Delete('clear')
  async clear(): Promise<{ message: string }> {
    await this.uuidEntityService.clear();
    return { message: 'All UUID entities deleted' };
  }
}