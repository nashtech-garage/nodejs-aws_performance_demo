import { Injectable } from '@nestjs/common';
import { CreateTopChannelDto } from './dto/create-top-channel.dto';
import { UpdateTopChannelDto } from './dto/update-top-channel.dto';

@Injectable()
export class TopChannelService {
  create(createTopChannelDto: CreateTopChannelDto) {
    return 'This action adds a new topChannel';
  }

  findAll() {
    return `This action returns all topChannel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topChannel`;
  }

  update(id: number, updateTopChannelDto: UpdateTopChannelDto) {
    return `This action updates a #${id} topChannel`;
  }

  remove(id: number) {
    return `This action removes a #${id} topChannel`;
  }
}
