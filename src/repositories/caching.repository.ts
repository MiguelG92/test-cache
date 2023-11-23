import {inject} from '@loopback/core';
import {DefaultKeyValueRepository, juggler} from '@loopback/repository';
import {RedisDataSource} from '../datasources';
import {WeatherData} from '../models';

export class CachingRepository extends DefaultKeyValueRepository<
WeatherData
> {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(WeatherData, dataSource);
  }
}

