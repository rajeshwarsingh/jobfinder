import {Entity, model, property} from '@loopback/repository';

@model()
export class Follow extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  followId?: string;

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
  followTypeId?: string;

  @property({
    type: 'string',
  })
  message?: string;

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

  constructor(data?: Partial<Follow>) {
    super(data);
  }
}

export interface FollowRelations {
  // describe navigational properties here
}

export type FollowWithRelations = Follow & FollowRelations;
