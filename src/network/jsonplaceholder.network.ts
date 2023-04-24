import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JsonPlaceholderNetwork {
  apiUrl: string;
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get('JSON_PLACE_HOLDER_API_URL');
  }

  public async getUsers(): Promise<any[]> {
    const response = await this.httpService.get(this.apiUrl).toPromise();
    return response.data;
  }
}
