import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookCategoryModule } from './book-category/book-category.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [BookCategoryModule],
})
export class AppModule {}
