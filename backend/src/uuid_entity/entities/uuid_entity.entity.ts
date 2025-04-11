import { Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('uuid_entity')
export class UuidEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created_at: Date;
}