import {Entity, model, property} from '@loopback/repository';

@model()
export class Comment extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  commentId?: string;

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
  commentTypeId?: string;

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

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
}

export type CommentWithRelations = Comment & CommentRelations;
