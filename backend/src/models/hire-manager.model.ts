import {Entity, model, property} from '@loopback/repository';

@model()
export class HireManager extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  hireMngrId: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
  })
  registrationDate?: string;

  @property({
    type: 'string',
  })
  location?: string;

  @property({
    type: 'date',
    itemType: 'string',
    default: new Date(),
  })
  updatedTime?: string;

  constructor(data?: Partial<HireManager>) {
    super(data);
  }
}

export interface HireManagerRelations {
  // describe navigational properties here
}

export type HireManagerWithRelations = HireManager & HireManagerRelations;
