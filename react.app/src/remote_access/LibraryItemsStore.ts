import axio, { AxiosStatic } from 'axios';
import { LibraryItem, PaginationData, SafeError } from '../types';

const url = 'http://localhost:3000';
const typePaths = {
  'Book': 'books',
  'Dvd': 'dvds',
  'AudioBook': 'audiobooks',
  'ReferenceBook': 'referencebooks',
};


export class LibraryItemsStore {
  constructor(private axios: AxiosStatic = axio) {}

  public async getLibraryItems(): Promise<PaginationData<LibraryItem>> {
    try {
      const response = await this.axios.get(`${url}/items`);
      return response.data;
    } catch (error: any) {
      if (this.axios.isAxiosError(error) && error.response) {
        const { response } = error;
        throw new SafeError(response.data as string || 'Unknown error');
      } else {
        throw error;
      }
    }
  }

  public async updateLibraryItem(item: LibraryItem): Promise<boolean> {
    const typePath = (typePaths as any)[item.type];
    try {
      const response = await this.axios.patch(`${url}/${typePath}/${item.id}`, item);
      return Boolean(response.data.wasSuccessful);
    } catch (error: any) {
      if (this.axios.isAxiosError(error) && error.response) {
        const { response } = error;
        throw new SafeError(response.data as string || 'Unknown error');
      } else {
        return false;
      }
    }
  }
}