import axios from 'axios';

import { BookConnector } from '../books';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BookConnector', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('searches books and normalizes results', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        docs: [
          {
            key: 'work-1',
            title: 'Book Title',
            author_name: ['Author'],
            first_publish_year: 2020,
            cover_i: 123,
          },
          {
            key: 'work-2',
            title: 'No Cover',
            author_name: [],
          },
        ],
      },
    });

    const connector = new BookConnector();
    const results = await connector.search('test');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('https://openlibrary.org/search/.json'),
    );
    expect(results).toEqual([
      {
        id: 'work-1',
        title: 'Book Title',
        author: 'Author',
        year: '2020',
        coverUrl: 'https://covers.openlibrary.org/b/id/123-M.jpg',
        provider: 'OPEN_LIBRARY',
        type: 'BOOK',
      },
      {
        id: 'work-2',
        title: 'No Cover',
        author: undefined,
        year: undefined,
        coverUrl: undefined,
        provider: 'OPEN_LIBRARY',
        type: 'BOOK',
      },
    ]);
  });

  it('returns empty array when search results are empty', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: {} });

    const connector = new BookConnector();
    const results = await connector.search('none');

    expect(results).toEqual([]);
  });

  it('returns null when book not found by id', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: null });

    const connector = new BookConnector();
    const result = await connector.getById('work-unknown');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://openlibrary.org/works/work-unknown.json',
    );
    expect(result).toBeNull();
  });

  it('normalizes book when fetched by id', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        key: 'work-2',
        title: 'Another Book',
        authors: [{ name: 'Author' }],
        first_publish_year: 2010,
        cover_i: undefined,
      },
    });

    const connector = new BookConnector();
    const result = await connector.getById('work-2');

    expect(result).toEqual({
      id: 'work-2',
      title: 'Another Book',
      author: 'Author',
      year: '2010',
      coverUrl: undefined,
      provider: 'OPEN_LIBRARY',
      type: 'BOOK',
    });
  });
});
