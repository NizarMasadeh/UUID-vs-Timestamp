import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UuidEntityModule } from './uuid_entity/uuid_entity.module';
import { TimestampEntityModule } from './timestamp_entity/timestamp_entity.module';
import { TypeOrmOptionsService } from './config/typeorm-options.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmOptionsService,
    }),
    UuidEntityModule,
    TimestampEntityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
