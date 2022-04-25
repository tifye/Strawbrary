import axio, { AxiosStatic } from 'axios';
import { LibraryItem, PaginationData, SafeError } from '../types';

const url = 'http://localhost:3000';

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
}