import {Entity, model, property} from '@loopback/repository';

@model()
export class Notification extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  notificationId?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  subtype?: string;

  @property({
    type: 'object',
  })
  data?: object;

  @property({
    type: 'string',
  })
  userId?: string;

  @property({
    type: 'string',
  })
  notifyId?: string;

  @property({
    type: 'string',
  })
  notificationTypeId?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  readedUsers?: string[];

  @property({
    type: 'string',
  })
  message?: string;

  @property({
    type: 'string',
  })
  status?: string; //read-unread

  @property({
    type: 'string',
  })
  createrUserId?: string; //read-unread

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

  constructor(data?: Partial<Notification>) {
    super(data);
  }
}

export interface NotificationRelations {
  // describe navigational properties here
}

export type NotificationWithRelations = Notification & NotificationRelations;
