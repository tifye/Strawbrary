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

  public async getLibraryItems(pagination?: { page?: number, perPage?: number, search?: string, orderDirection?: 'asc' | 'desc'}): Promise<PaginationData<LibraryItem>> {
    const { page, perPage, search, orderDirection } = pagination || {};
    try {
      const response = await this.axios.get(`${url}/items`, {
        ...(pagination && {
          params: {
            ...(page && { page }),
            ...(perPage && { perPage }),
            ...(search && { search }),
            ...(orderDirection && { orderDirection }),
          },
        })
      });
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

  public async deleteLibraryItem(item: LibraryItem): Promise<boolean> {
    try {
      const response = await this.axios.delete(`${url}/items/${item.id}`);
      // TODO: Fix this both here and on backend. 
      return Boolean(response.data);
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