import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Jobs extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  jobId: string;

  @property({
    type: 'string',
  })
  hireMngrId?: string;

  @property({
    type: 'string',
  })
  companyName?: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  location?: string;

  @property({
    type: 'string',
  })
  jobFunType?: string;

  @property({
    type: 'string',
  })
  empType?: string;

  @property({
    type: 'string',
  })
  compIndus?: string;

  @property({
    type: 'string',
  })
  seniority?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    itemType: 'string',
  })
  skills?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  files?: object[];

  @property({
    type: 'date',
  })
  createdDate?: 'string';

  @property({
    type: 'date',
    itemType: 'string',
    default: new Date(),
  })
  UpdatedTime?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  block?: string[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Jobs>) {
    super(data);
  }
}

export interface JobsRelations {
  // describe navigational properties here
}

export type JobsWithRelations = Jobs & JobsRelations;
