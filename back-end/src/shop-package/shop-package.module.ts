import { Module } from '@nestjs/common';
import { ShopPackageService } from './shop-package.service';
import { ShopPackageController } from './shop-package.controller';

@Module({
  controllers: [ShopPackageController],
  providers: [ShopPackageService],
})
export class ShopPackageModule {}
