import {Entity, model, property} from '@loopback/repository';

@model()
export class FavouriteService extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  favouriteServiceId: string;

  @property({
    type: 'string',
    required: true,
  })
  serviceId: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
  })
  title: string;

  @property({
    type: 'object',
    itemType: 'string',
  })
  serviceLogo?: object;

  @property({
    type: 'array',
    itemType: 'string',
  })
  skills?: string[];

  @property({
    type: 'object',
  })
  priceRange?: object;

  // @property({
  //   type: 'string',
  // })
  // jobCategory?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  jobCategory?: string[];

  @property({
    type: 'date',
    itemType: 'string',
    default: new Date(),
  })
  updatedTime?: string;

  constructor(data?: Partial<FavouriteService>) {
    super(data);
  }
}

export interface FavouriteServiceRelations {
  // describe navigational properties here
}

export type FavouriteServiceWithRelations = FavouriteService &
  FavouriteServiceRelations;
