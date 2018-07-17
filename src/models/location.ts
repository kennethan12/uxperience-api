import { model, Entity, property } from "@loopback/repository";

@model({
  name: 'location'
})
export class Location extends Entity {

  @property({
    type: 'number',
    id: true
  })
  location_id: number;

  @property({
    type: 'string'
  })
  address: number;

  @property({
    type: 'string'
  })
  city_name: string; // city name

  @property({
    type: 'string'
  })
  state_province_region: string;

  @property({
    type: 'string'
  })
  zip_number: string;

  @property({
    type: 'string'
  })
  country: string;

  getLocationId() {
    return this.location_id;
  }
}
