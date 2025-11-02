import { PrismaClient } from '@prisma/client';

export abstract class BaseRepository<TModel> {
  protected readonly prisma: PrismaClient;
  protected readonly model: any;

  constructor(prisma: PrismaClient, model: any) {
    this.prisma = prisma;
    this.model = model;
  }

  async findAll(): Promise<TModel[]> {
    return this.model.findMany();
  }

  async findById(id: string): Promise<TModel | null> {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: Partial<TModel>): Promise<TModel> {
    return this.model.create({ data });
  }

  async update(id: string, data: Partial<TModel>): Promise<TModel> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string): Promise<TModel> {
    return this.model.delete({ where: { id } });
  }
}
