import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}
}
