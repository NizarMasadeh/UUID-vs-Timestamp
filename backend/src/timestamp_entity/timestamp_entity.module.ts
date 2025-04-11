import { Module } from '@nestjs/common';
import { TimestampEntityService } from './timestamp_entity.service';
import { TimestampEntityController } from './timestamp_entity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimestampEntity } from './entities/timestamp_entity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TimestampEntity
    ])],
  providers: [TimestampEntityService],
  controllers: [TimestampEntityController],
})
export class TimestampEntityModule { }
