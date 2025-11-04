import axios from 'axios';

import { MediaType } from '@/constants';
import { ExternalMedia } from '@/types/media';

import { BaseConnector } from '../BaseConnector';

export class BookConnector extends BaseConnector {
  private BASE_URL = 'https://openlibrary.org/search/.json';

  constructor() {
    super('OPEN_LIBRARY', MediaType.BOOK);
  }

  async search(query: string): Promise<ExternalMedia[]> {
    const url = `${this.BASE_URL}?q=${encodeURIComponent(query)}&limit=10`;
    const { data } = await axios.get(url);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.docs || []).map((book: any) =>
      this.normalizeResult({
        id: book.key,
        title: book.title,
        author: book.author_name?.[0],
        year: book.first_publish_year?.toString(),
        coverUrl: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : undefined,
      }),
    );
  }

  async getById(id: string): Promise<ExternalMedia | null> {
    const { data } = await axios.get(`https://openlibrary.org/works/${id}.json`);

    if (!data) {
      return null;
    }

    return this.normalizeResult({
      id: data.key,
      title: data.title,
      author: data.authors?.[0].name,
      year: data.first_publish_year?.toString(),
      coverUrl: data.cover_i
        ? `https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg`
        : undefined,
    });
  }
}
