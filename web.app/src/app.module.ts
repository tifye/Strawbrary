import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { LibraryItemsModule } from './library_items/library_items.module';
import { PrismaService } from './prisma.service';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [EmployeesModule, LibraryItemsModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
