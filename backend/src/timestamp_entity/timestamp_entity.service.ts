import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimestampEntity } from './entities/timestamp_entity.entity';
import { BatchResult } from 'src/models/id-body.interface';

@Injectable()
export class TimestampEntityService {
  constructor(
    @InjectRepository(TimestampEntity)
    private timestampRepository: Repository<TimestampEntity>,
  ) { }

  async create(): Promise<TimestampEntity> {
    const entity = new TimestampEntity();
    entity.id = Date.now();
    return this.timestampRepository.save(entity);
  }

  async createBatch(count: number): Promise<BatchResult> {
    const startTime = Date.now();
    let success = 0;
    let failed = 0;
    let collisions = 0;

    const promises: Promise<void>[] = [];
    for (let i = 0; i < count; i++) {
      const entity = new TimestampEntity();
      entity.id = Date.now();

      const promise = this.timestampRepository.save(entity)
        .then(() => {
          success++;
        })
        .catch((error) => {
          failed++;
          if (error.code === '23505') {
            collisions++;
          }
        });
      promises.push(promise);
    }

    await Promise.all(promises);
    const executionTime = Date.now() - startTime;

    return { success, failed, collisions, executionTime };
  }

  async findAll(): Promise<TimestampEntity[]> {
    return this.timestampRepository.find();
  }

  async count(): Promise<number> {
    return this.timestampRepository.count();
  }

  async clear(): Promise<void> {
    await this.timestampRepository.clear();
  }
}