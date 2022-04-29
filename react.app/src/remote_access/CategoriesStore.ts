import axio, { AxiosStatic } from 'axios';
import { plainToInstance } from 'class-transformer';
import { Category, SafeError } from '../types';

const url = process.env.REACT_APP_BASE_URL;

export class CategoriesStore {
  constructor(private axios: AxiosStatic = axio) {}

  private static _categories?: Category[];



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

  public async addCategory(category: Category): Promise<Category> {
    try {
      const response = await this.axios.post(`${url}/categories`, category);
      const newCategory = plainToInstance(Category, response.data);
      return newCategory;
    } catch (error: any) {
      if (this.axios.isAxiosError(error) && error.response) {
        const { response } = error;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const message = response.status === 400 ? response.data.message[0] : 'Remote error';
        throw new SafeError(message);
      } else {
        throw error;
      }
    }
  }

  public async deleteCategory(category: Category): Promise<boolean> {
    try {
      const response = await this.axios.delete(`${url}/categories/${category.id}`);
      return response.data.wasSuccessful;
    } catch (error: any) {
      if (this.axios.isAxiosError(error) && error.response) {
        const { response } = error;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const message = response.status === 400 ? response.data.message[0] : 'Remote error';
        throw new SafeError(message);
      } else {
        return false;
      }
    }
  }

  public async updateCategory(category: Category): Promise<Category> {
    try {
      const response = await this.axios.patch(`${url}/categories/${category.id}`, category);
      const newCategory = plainToInstance(Category, response.data);
      return newCategory;
    } catch (error: any) {
      if (this.axios.isAxiosError(error) && error.response) {
        const { response } = error;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const message = response.status === 400 ? response.data.message[0] : 'Remote error';
        throw new SafeError(message);
      } else {
        throw error;
      }
    }
  }
}