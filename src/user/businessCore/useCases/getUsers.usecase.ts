import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RabbitMQService } from '../services/rabbitmq.service';
import { User } from '../interfaces/user.interface';

@Injectable()
export class GetUsersUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly rabbitmqService: RabbitMQService,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userService.getUsers();
    const filteredUsers = users.map(({ address, ...rest }) => rest);
    const sortedUsers = filteredUsers.sort((a, b) => b.id - a.id);
    await this.rabbitmqService.publishUsers(
      sortedUsers.filter((user) => user.id % 2 === 0),
    );
    return sortedUsers;
  }
}
