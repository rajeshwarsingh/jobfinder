import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class FavouriteUser extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  favouriteUserId: string;

  @property({
    type: 'string',
    required: true,
  })
  freelancerId: string;

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
  userLogo?: object;

  @property({
    type: 'array',
    itemType: 'string',
  })
  skills?: string[];

  @property({
    type: 'object',
  })
  priceRange?: object;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<FavouriteUser>) {
    super(data);
  }
}

export interface FavouriteUserRelations {
  // describe navigational properties here
}

export type FavouriteUserWithRelations = FavouriteUser & FavouriteUserRelations;
