import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { LibraryItemsModule } from './library_items/library_items.module';
import { PrismaService } from './prisma.service';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrderDirectionPipe } from './.pipes/order_direction.pipe';
import { OrderDirectionRule } from './.rules/order_direction.rule';

@Module({
  imports: [
    EmployeesModule,
    LibraryItemsModule,
    CategoriesModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    OrderDirectionPipe,
    OrderDirectionRule,
  ],
  exports: [PrismaService],
})
export class AppModule {}
