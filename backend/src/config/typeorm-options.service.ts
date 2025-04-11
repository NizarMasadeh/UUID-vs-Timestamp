import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { getMetadataArgsStorage } from 'typeorm';

@Injectable()
export class TypeOrmOptionsService implements TypeOrmOptionsFactory {
    constructor(private readonly config: ConfigService) { }

    createTypeOrmOptions(
        connectionName?: string,
    ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return {
            type: 'postgres',
            username: this.config.get('PG_USERNAME'),
            password: this.config.get('DB_PASSWORD'),
            host: this.config.get('DB_HOST'),
            port: Number(this.config.get('DB_PORT')),
            database: this.config.get('DB_NAME'),
            synchronize: false,
            dropSchema: false,
            logging: this.config.get('DB_LOGGING') == 'true',
            entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
            subscribers: [],
            migrations:
                process.env.NODE_ENV === 'production' ? ['./migrations/*.ts'] : [],
            migrationsRun: true,
            autoLoadEntities: true,
            // ssl: { rejectUnauthorized: true },
        };
    }
}
