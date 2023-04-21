import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserService } from './businessCore/services/user.service';
import { RabbitMQService } from './businessCore/services/rabbitmq.service';
import { GetUsersUseCase } from './businessCore/useCases/getUsers.usecase';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users-requested',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, RabbitMQService, GetUsersUseCase],
  exports: [UserService, RabbitMQService, GetUsersUseCase],
})
export class UserModule {}
