import { protobufPackage } from '@app/account/pb/account.pb';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: protobufPackage,
      protoPath: [config.get('GRPC_ACCOUNT_PROTO_PATH')],
      url: `${config.get('GRPC_HOST')}:${config.get('GRPC_PORT')}`,
    },
  });

  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
