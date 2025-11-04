import * as connectors from '../index';

describe('connectors index', () => {
  it('re-exports book connector', () => {
    expect(connectors.BookConnector).toBeDefined();
  });
});
