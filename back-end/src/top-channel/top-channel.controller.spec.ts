import { Test, TestingModule } from '@nestjs/testing';
import { TopChannelController } from './top-channel.controller';
import { TopChannelService } from './top-channel.service';

describe('TopChannelController', () => {
  let controller: TopChannelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopChannelController],
      providers: [TopChannelService],
    }).compile();

    controller = module.get<TopChannelController>(TopChannelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
