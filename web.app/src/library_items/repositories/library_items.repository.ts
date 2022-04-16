import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LibraryItemsRepository {
  constructor(private prisma: PrismaService) {}
}
