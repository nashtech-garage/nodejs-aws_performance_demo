import { Test, TestingModule } from '@nestjs/testing';
import { UsedDeviceService } from './used-device.service';

describe('UsedDeviceService', () => {
  let service: UsedDeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsedDeviceService],
    }).compile();

    service = module.get<UsedDeviceService>(UsedDeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
