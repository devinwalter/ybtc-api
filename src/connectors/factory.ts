import { MediaType } from '@/constants';
import { MediaConnector } from '@/types/media';

import { BookConnector } from './books';

export function getConnectorForType(type: MediaType): MediaConnector {
  switch (type.toUpperCase()) {
    case 'BOOK':
      return new BookConnector();
    default:
      throw new Error('Unsupported media type');
  }
}
