import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {WeatherDataSource} from '../datasources';
import {WeatherData} from '../models';



export interface Weather {
  getWeather(latitude: string, longitude: string): Promise<WeatherData>;
}

export class WeatherProvider implements Provider<Weather> {
  constructor(
    @inject('datasources.weather')
    protected dataSource: WeatherDataSource = new WeatherDataSource(),
  ) {}

  value(): Promise<Weather> {
    return getService(this.dataSource);
  }
}
