import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {AnyObject, juggler} from '@loopback/repository';

const config = {
  name: 'redis',
  connector: 'kv-redis',
  url: '',
  host: '127.0.0.1',
  port: 6379,
  password: '',
  db: 0
};


function updateConfig(dsConfig: AnyObject) {
  if (process.env.OPENSHIFT_SERVICE_HOST) {
    dsConfig.host = process.env.SHOPPING_APP_REDIS_MASTER_SERVICE_HOST;
    console.log(process.env.SHOPPING_APP_REDIS_MASTER_SERVICE_HOST);
    dsConfig.port = +process.env.SHOPPING_APP_REDIS_MASTER_SERVICE_PORT!;
    console.log(process.env.SHOPPING_APP_REDIS_MASTER_SERVICE_PORT);

  }
  return dsConfig;
}



@lifeCycleObserver('datasource')
export class RedisDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'redis';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.redis', {optional: true})
    dsConfig: object = config,
  ) {
    super(updateConfig(dsConfig));
  }
}
