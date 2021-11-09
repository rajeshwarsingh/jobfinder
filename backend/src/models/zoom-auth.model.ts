import {Model, model, property} from '@loopback/repository';

@model()
export class ZoomAuth extends Model {
  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'string',
  })
  redirectURL?: string;

  @property({
    type: 'string',
  })
  access_token?: string;

  @property({
    type: 'string',
  })
  refresh_token?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  zoomAuthId?: string;


  constructor(data?: Partial<ZoomAuth>) {
    super(data);
  }
}

export interface ZoomAuthRelations {
  // describe navigational properties here
}

export type ZoomAuthWithRelations = ZoomAuth & ZoomAuthRelations;
