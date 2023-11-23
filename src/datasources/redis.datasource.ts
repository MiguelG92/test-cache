import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'redis',
  connector: 'kv-redis',
  url: '',
  host: '10.217.5.239',
  port: 6379,
  password: '123456789',
  db: 0
};


@lifeCycleObserver('datasource')
export class RedisDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'redis';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.redis', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
