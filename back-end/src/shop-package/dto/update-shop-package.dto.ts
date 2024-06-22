import { PartialType } from '@nestjs/swagger';
import { CreateShopPackageDto } from './create-shop-package.dto';

export class UpdateShopPackageDto extends PartialType(CreateShopPackageDto) {}
