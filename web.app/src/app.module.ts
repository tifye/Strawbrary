import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [EmployeesModule, BooksModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
