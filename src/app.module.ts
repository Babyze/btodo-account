import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AccountModule } from './account/account.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'btodo-utils';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_ACCOUNT_USERNAME: Joi.string().required(),
        DB_ACCOUNT_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().required(),
        GRPC_HOST: Joi.string().required(),
        GRPC_PORT: Joi.number().required(),
        GRPC_ACCOUNT_PROTO_PATH: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_ACCOUNT_USERNAME'),
        password: configService.getOrThrow('DB_ACCOUNT_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
    }),
    AccountModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
