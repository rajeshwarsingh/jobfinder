import {Entity, model, property} from '@loopback/repository';

@model()
export class Rating extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  ratingId?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @property({
    type: 'string',
  })
  userName?: string;

  @property({
    type: 'string',
  })
  ratingTypeId?: string;

  @property({
    type: 'string',
  })
  message?: string;

  @property({
    type: 'string',
  })
  rating?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'date',
    itemType: 'string',
  })
  createdDate?: string;

  @property({
    type: 'date',
    itemType: 'string',
    default: new Date(),
  })
  updatedDate?: string;

  constructor(data?: Partial<Rating>) {
    super(data);
  }
}

export interface RatingRelations {
  // describe navigational properties here
}

export type RatingWithRelations = Rating & RatingRelations;
