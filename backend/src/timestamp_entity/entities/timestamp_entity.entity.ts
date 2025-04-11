import { Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('timestamp_entity')
export class TimestampEntity {
    @PrimaryColumn('bigint')
    id: number;

    @CreateDateColumn()
    created_at: Date;
}