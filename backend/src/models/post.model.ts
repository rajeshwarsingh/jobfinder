import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Post extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
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
  title?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'object',
    itemType: 'string',
  })
  postLogo?: object;

  @property({
    type: 'object',
    itemType: 'string',
  })
  postBg?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  files?: object[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  skills?: string[];

  @property({
    type: 'string',
  })
  paymentType?: string;

  @property({
    type: 'object',
  })
  priceRange?: object;

  @property({
    type: 'string',
  })
  currency?: string;

  @property({
    type: 'string',
  })
  jobType?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  jobCategory?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  profession?: string[];

  @property({
    type: 'object',
  })
  location?: object;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  expectedDuration?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  geometry?: object[];

  @property({
    type: 'string',
  })
  review?: string;

  @property({
    type: 'string',
  })
  avgRating?: string;

  @property({
    type: 'string',
  })
  author?: string;

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
  UpdatedTime?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  questionnaire?: object[];

  @property({
    type: 'boolean',
    itemType: 'boolean',
    default: false,
  })
  questionnaireSelected?: boolean;

  @property({
    type: 'array',
    itemType: 'string',
  })
  block?: string[];

  @property({
    type: 'object',
  })
  workingHours?: object;

  @property({
    type: 'string',
  })
  NoOfWeeks?: string;

  @property({
    type: 'string',
  })
  passingQuesCount?: string;

  @property({
    type: 'string',
  })
  workingPref?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Post>) {
    super(data);
  }
}

export interface PostRelations {
  // describe navigational properties here
}

export type PostWithRelations = Post & PostRelations;
