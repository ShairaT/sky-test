import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { RabbitMQService } from './businessCore/services/rabbitmq.service';
import { GetUsersUseCase } from './businessCore/useCases/getUsers.usecase';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { JsonPlaceholderNetwork } from '../network/jsonplaceholder.network';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URL')],
            queue: 'users-requested',
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [JsonPlaceholderNetwork, RabbitMQService, GetUsersUseCase],
  exports: [JsonPlaceholderNetwork, RabbitMQService, GetUsersUseCase],
})
export class UserModule {}
