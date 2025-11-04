import { BookConnector } from '../books';
import { getConnectorForType } from '../factory';

describe('getConnectorForType', () => {
  it('returns book connector when type is book', () => {
    const connector = getConnectorForType('book' as any);
    expect(connector).toBeInstanceOf(BookConnector);
  });

  it('throws when media type is unsupported', () => {
    expect(() => getConnectorForType('unknown' as any)).toThrow('Unsupported media type');
  });
});
