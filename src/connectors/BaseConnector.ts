import { MediaType } from '@/constants';
import { ExternalMedia, MediaConnector } from '@/types/media';

export abstract class BaseConnector implements MediaConnector {
  protected provider: string;
  protected type: MediaType;

  constructor(provider: string, type: MediaType) {
    this.provider = provider;
    this.type = type;
  }

  abstract search(query: string): Promise<ExternalMedia[]>;
  abstract getById(id: string): Promise<ExternalMedia | null>;

  protected normalizeResult(data: Partial<ExternalMedia>): ExternalMedia {
    return {
      id: data.id!,
      title: data.title || 'Unknown Title',
      author: data.author,
      year: data.year,
      coverUrl: data.coverUrl,
      provider: this.provider,
      type: this.type,
    };
  }
}
