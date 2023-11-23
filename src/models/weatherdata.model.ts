import { Entity, model, property } from '@loopback/repository';

@model()
export class WeatherData extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  latitude: number;

  @property({
    type: 'number',
    required: true,
  })
  longitude: number;

  @property({
    type: 'number',
    required: true,
  })
  generationtime_ms: number;

  @property({
    type: 'number',
    required: true,
  })
  utc_offset_seconds: number;

  @property({
    type: 'string',
    required: true,
  })
  timezone: string;

  @property({
    type: 'string',
    required: true,
  })
  timezone_abbreviation: string;

  @property({
    type: 'number',
    required: true,
  })
  elevation: number;

  @property({
    type: 'object',
    required: true,
  })
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
  };

  @property({
    type: 'object',
    required: true,
  })
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
  };



  constructor(data?: Partial<WeatherData>) {
    super(data);
  }
}


export interface WeatherRelations {
  // describe navigational properties here
}

export type WeatherWithRelations = WeatherData & WeatherRelations;
