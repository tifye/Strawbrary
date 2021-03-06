import { Injectable } from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { CreateAudioBookDto } from '../dto/create_audio_book.dto';
import { UpdateAudioBookDto } from '../dto/update_audio_book.dto';
import { LibraryItemType } from '../enums/library_item_type.enum';
import { LibraryItemsRepository } from '../repositories/library_items.repository';

@Injectable()
export class AudioBookService {
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

  async update(
    id: number,
    audioBook: UpdateAudioBookDto,
  ): Promise<[number?, string?]> {
    const result = await this.libraryItemsRepository.updateItem(
      id,
      LibraryItemType.AudioBook,
      audioBook,
    );

    if (result[1]) {
      return [undefined, 'Database Error'];
    }

    return [result[0], undefined];
  }
}
