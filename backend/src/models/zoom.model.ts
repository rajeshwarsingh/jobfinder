import {Entity, model, property} from '@loopback/repository';

@model()
export class Zoom extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  zoomId?: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'string',
  })
  clientID?: string;

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
  })
  redirect_uri?: string;

  @property({
    type: 'object',
    itemType: 'string',
  })
  authInfo?: object;

  @property({
    type: 'object',
    itemType: 'string',
  })
  user?: object;

  constructor(data?: Partial<Zoom>) {
    super(data);
  }
}

export interface ZoomRelations {
  // describe navigational properties here
}

export type ZoomWithRelations = Zoom & ZoomRelations;
