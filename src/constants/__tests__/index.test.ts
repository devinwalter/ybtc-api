import { MediaType } from '../index';

describe('MediaType enum', () => {
  it('contains known media types', () => {
    expect(MediaType.BOOK).toBe('BOOK');
    expect(MediaType.SHOW).toBe('SHOW');
    expect(MediaType.MOVIE).toBe('MOVIE');
    expect(MediaType.SONG).toBe('SONG');
  });
});
