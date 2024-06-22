import { Test, TestingModule } from '@nestjs/testing';
import { UsedDeviceController } from './used-device.controller';
import { UsedDeviceService } from './used-device.service';

describe('UsedDeviceController', () => {
  let controller: UsedDeviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsedDeviceController],
      providers: [UsedDeviceService],
    }).compile();

    controller = module.get<UsedDeviceController>(UsedDeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
