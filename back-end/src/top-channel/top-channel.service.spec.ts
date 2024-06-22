import { Test, TestingModule } from '@nestjs/testing';
import { TopChannelService } from './top-channel.service';

describe('TopChannelService', () => {
  let service: TopChannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopChannelService],
    }).compile();

    service = module.get<TopChannelService>(TopChannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
