import {Entity, model, property} from '@loopback/repository';

@model()
export class Wishlist extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  wishlistId: string;

  @property({
    type: 'string',
    required: true,
  })
  postId: string;

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
  postLogo?: object;

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

  constructor(data?: Partial<Wishlist>) {
    super(data);
  }
}

export interface WishlistRelations {
  // describe navigational properties here
}

export type WishlistWithRelations = Wishlist & WishlistRelations;
