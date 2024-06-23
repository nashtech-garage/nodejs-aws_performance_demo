import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentOverviewService } from './payment-overview.service';
import { CreatePaymentOverviewDto } from './dto/create-payment-overview.dto';
import { UpdatePaymentOverviewDto } from './dto/update-payment-overview.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment Overview')
@Controller('payment-overview')
export class PaymentOverviewController {
  constructor(private readonly paymentOverviewService: PaymentOverviewService) {}

  @Post()
  create(@Body() createPaymentOverviewDto: CreatePaymentOverviewDto) {
    return this.paymentOverviewService.create(createPaymentOverviewDto);
  }

  @Get()
  findAll() {
    return this.paymentOverviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentOverviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentOverviewDto: UpdatePaymentOverviewDto) {
    return this.paymentOverviewService.update(+id, updatePaymentOverviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentOverviewService.remove(+id);
  }
}
