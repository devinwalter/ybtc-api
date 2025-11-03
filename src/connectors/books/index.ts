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
}
