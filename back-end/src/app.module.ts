import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SummaryModule } from './summary/summary.module';
import { PaymentOverviewModule } from './payment-overview/payment-overview.module';
import { ProfitModule } from './profit/profit.module';
import { UsedDeviceModule } from './used-device/used-device.module';
import { TopChannelModule } from './top-channel/top-channel.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { ShopPackageModule } from './shop-package/shop-package.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { CalendarEventModule } from './calendar-event/calendar-event.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
// import { Summary } from './summary/entities/summary.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [SummaryModule, PaymentOverviewModule, 
    ProfitModule, UsedDeviceModule, TopChannelModule, ProductModule, 
    UserModule, ShopPackageModule, ProductCategoryModule, CalendarEventModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development.local', '.env.development'],
      load: [configuration]
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configuration().database.host, // 'localhost',
      port: configuration().database.port, // 32769,
      username: configuration().database.user, // 'root',
      password: configuration().database.password,
      database: configuration().database.name, // 'aws_performance_demo',
      // entities: [Summary],
      synchronize: configuration().database.synchronize,
      autoLoadEntities: true, // That will auto load entity when module call TypeOrmModule.forFeature
    })
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
