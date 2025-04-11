import { Controller, Post, Get, Delete, Query } from '@nestjs/common';
import { TimestampEntity } from './entities/timestamp_entity.entity';
import { TimestampEntityService } from './timestamp_entity.service';


@Controller('timestamp-entity')
export class TimestampEntityController {
  constructor(private readonly timestampEntityService: TimestampEntityService) { }

  @Post()
  async create(): Promise<TimestampEntity> {
    return this.timestampEntityService.create();
  }

  @Post('batch')
  async createBatch(@Query('count') count: number = 100) {
    return this.timestampEntityService.createBatch(count);
  }

  @Get()
  async findAll(): Promise<TimestampEntity[]> {
    return this.timestampEntityService.findAll();
  }

  @Get('count')
  async count(): Promise<{ count: number }> {
    const count = await this.timestampEntityService.count();
    return { count };
  }

  @Delete('clear')
  async clear(): Promise<{ message: string }> {
    await this.timestampEntityService.clear();
    return { message: 'All timestamp entities deleted' };
  }
}