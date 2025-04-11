import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UuidEntity } from './entities/uuid_entity.entity';
import { BatchResult } from 'src/models/id-body.interface';

@Injectable()
export class UuidEntityService {
  constructor(
    @InjectRepository(UuidEntity)
    private uuidRepository: Repository<UuidEntity>,
  ) { }

  async create(): Promise<UuidEntity> {
    const entity = new UuidEntity();
    return this.uuidRepository.save(entity);
  }

  async createBatch(count: number): Promise<BatchResult> {
    const startTime = Date.now();
    let success = 0;
    let failed = 0;
    let collisions = 0;

    const promises: Promise<void>[] = [];
    for (let i = 0; i < count; i++) {
      const entity = new UuidEntity();
      const promise = this.uuidRepository.save(entity)
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

  async findAll(): Promise<UuidEntity[]> {
    return this.uuidRepository.find();
  }

  async count(): Promise<number> {
    return this.uuidRepository.count();
  }

  async clear(): Promise<void> {
    await this.uuidRepository.clear();
  }
}