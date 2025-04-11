import { Module } from '@nestjs/common';
import { UuidEntityService } from './uuid_entity.service';
import { UuidEntityController } from './uuid_entity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UuidEntity } from './entities/uuid_entity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UuidEntity
    ])],
  providers: [UuidEntityService],
  controllers: [UuidEntityController],
})
export class UuidEntityModule { }
