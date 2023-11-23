import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: "weather",
  connector: "rest",
  operations: [
    {
      "template": {
        "method": "GET",
        "url": "https://api.open-meteo.com/v1/forecast",
        "query": {
          "latitude": "{latitude}",
          "longitude": "{longitude}",
          "current": "temperature_2m",
          "timezone": "GMT",
          "forecast_days": "1"
        },
        "responsePath": "$"
      },
      "functions": {
        "getWeather": ["latitude", "longitude"]
      }
    }
  ]
};




@lifeCycleObserver('datasource')
export class WeatherDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'weather';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.weather', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
