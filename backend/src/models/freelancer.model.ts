import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Freelancer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
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
  registrationDate?: string;

  @property({
    type: 'string',
  })
  location?: string;

  @property({
    type: 'string',
  })
  overview?: string;

  @property({
    type: 'string',
  })
  profession?: string;

  @property({
    type: 'string',
  })
  hasSkills: string;

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

  constructor(data?: Partial<Freelancer>) {
    super(data);
  }
}

export interface FreelancerRelations {
  // describe navigational properties here
}

export type FreelancerWithRelations = Freelancer & FreelancerRelations;
