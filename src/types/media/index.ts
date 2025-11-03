import { MediaType } from '@/constants';

export interface ExternalMedia {
  id: string;
  title: string;
  author?: string;
  year?: string;
  coverUrl?: string;
  provider: string;
  type: MediaType;
}

export interface MediaConnector {
  search(query: string): Promise<ExternalMedia[]>;
  getById(id: string): Promise<ExternalMedia | null>;
}
