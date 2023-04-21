import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../interfaces/user.interface';

@Injectable()
export class RabbitMQService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  async publishUsers(user: User[]) {
    this.client.emit('users-requested', user);
  }
}
