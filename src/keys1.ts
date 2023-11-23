
import {BindingKey} from '@loopback/core';
import {CachingRepository} from './repositories';

/**
 * Strongly-typed binding key for CachingService
 */
export const CACHING_SERVICE = BindingKey.create<CachingRepository>(
  'repository.CachingService',
);