import axio, { AxiosStatic } from 'axios';
import { plainToInstance } from 'class-transformer';
import { Category, SafeError } from '../types';

const url = 'http://localhost:3000';

export class CategoriesStore {
  constructor(private axios: AxiosStatic = axio) {}

  public async getCategories(): Promise<Category[]> {
    try {
      const response = await this.axios.get(`${url}/categories`);
      const categories = plainToInstance(Category, response.data) as unknown as Category[];
      return categories;
    } catch (error: any) {
      if (this.axios.isAxiosError(error) && error.response) {
        const { response } = error;
        throw new SafeError(response.data as string || 'Unknown error');
      } else {
        throw error;
      }
    }
  }

  public async getCategory(id: number): Promise<Category> {
    try {
      const response = await this.axios.get(`${url}/categories/${id}`);
      const category = plainToInstance(Category, response.data);
      return category;
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