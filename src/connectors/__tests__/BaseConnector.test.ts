import { MediaType } from '@/constants';

import { BaseConnector } from '../BaseConnector';

class TestConnector extends BaseConnector {
  constructor() {
    super('TEST_PROVIDER', MediaType.BOOK);
  }

  search(): any {
    throw new Error('Method not implemented.');
  }

  getById(): any {
    throw new Error('Method not implemented.');
  }

  public exposeNormalize(data: any) {
    return this.normalizeResult(data);
  }
}

describe('BaseConnector', () => {
  it('normalizes results with defaults and provider/type metadata', () => {
    const connector = new TestConnector();
    const normalized = connector.exposeNormalize({
      id: 'book-1',
      title: 'Title',
    });

    expect(normalized).toEqual({
      id: 'book-1',
      title: 'Title',
      author: undefined,
      year: undefined,
      coverUrl: undefined,
      provider: 'TEST_PROVIDER',
      type: MediaType.BOOK,
    });

    const fallback = connector.exposeNormalize({ id: 'book-2' });
    expect(fallback.title).toBe('Unknown Title');
  });
});
