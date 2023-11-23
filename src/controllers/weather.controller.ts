import {get, param} from '@loopback/rest';
import {WeatherDataSource} from '../datasources';
import { inject, intercept } from '@loopback/core';
import {Weather} from '../services';
import { CachingInterceptor } from '../interceptors';

export class WeatherController {
  constructor(
    @inject('services.Weather') protected weatherService: Weather,
  ) {}

  @intercept(CachingInterceptor.BINDING_KEY)
  @get('/weather/{latitude}/{longitude}')
  async getWeather(@param.path.string('latitude') latitude: string, @param.path.string('longitude') longitude:string) {
   const response = await this.weatherService.getWeather(latitude,longitude);
    return response;
  }
}

