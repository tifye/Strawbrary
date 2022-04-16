import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { CategoriesModule } from './categories/categories.module';
import { LibraryItemsModule } from './library_items/library_items.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [EmployeesModule, LibraryItemsModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
