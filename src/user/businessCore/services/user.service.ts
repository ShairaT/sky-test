import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UserService {
  async getUsers(): Promise<any[]> {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users',
    );
    const users = response.data.map(({ address, ...rest }) => rest);
    return users.sort((a, b) => b.id - a.id);
  }
}
