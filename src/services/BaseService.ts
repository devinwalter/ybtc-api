import { BaseRepository } from '@/repositories/BaseRepository';

export abstract class BaseService<TModel> {
  protected repository: BaseRepository<TModel>;

  constructor(repository: BaseRepository<TModel>) {
    this.repository = repository;
  }

  async list(): Promise<TModel[]> {
    return this.repository.findAll();
  }

  async get(id: string): Promise<TModel | null> {
    return this.repository.findById(id);
  }

  async create(data: Partial<TModel>): Promise<TModel> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<TModel>): Promise<TModel> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<TModel> {
    return this.repository.delete(id);
  }
}
