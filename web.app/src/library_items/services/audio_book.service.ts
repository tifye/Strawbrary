import { Injectable } from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { CreateAudioBookDto } from '../dto/create_audio_book.dto';
import { LibraryItemType } from '../enums/library_item_type.enum';
import { LibraryItemsRepository } from '../repositories/library_items.repository';

@Injectable()
export class LibraryItemsService {
  constructor(private libraryItemsRepository: LibraryItemsRepository) {}
  async create(
    audioBook: CreateAudioBookDto,
  ): Promise<[LibraryItem?, string?]> {
    const { categoryId } = audioBook;
    const audioBookData = JSON.parse(JSON.stringify(audioBook));
    delete audioBookData.categoryId;
    const result = await this.libraryItemsRepository.createItem({
      ...audioBookData,
      type: LibraryItemType.AudioBook,
      isBorrowable: true,
      category: {
        connect: {
          id: categoryId,
        },
      },
    });

    if (result[1]) {
      return [undefined, result[1].message];
    }

    return [result[0], undefined];
  }
}
