import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopPackageService } from './shop-package.service';
import { CreateShopPackageDto } from './dto/create-shop-package.dto';
import { UpdateShopPackageDto } from './dto/update-shop-package.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Shop Package')
@Controller('shop-package')
export class ShopPackageController {
  constructor(private readonly shopPackageService: ShopPackageService) {}

  @Post()
  create(@Body() createShopPackageDto: CreateShopPackageDto) {
    return this.shopPackageService.create(createShopPackageDto);
  }

  @Get()
  findAll() {
    return this.shopPackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopPackageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopPackageDto: UpdateShopPackageDto) {
    return this.shopPackageService.update(+id, updateShopPackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopPackageService.remove(+id);
  }
}
