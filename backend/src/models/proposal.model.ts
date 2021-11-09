import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Proposal extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  proposalId: string;

  @property({
    type: 'string',
    id: true,
  })
  postId?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @property({
    type: 'string',
  })
  createrUserId?: string;

  @property({
    type: 'date',
  })
  proposalTime?: string;

  @property({
    type: 'string',
  })
  subscriptionID?: string;

  @property({
    type: 'string',
  })
  currentProposalStatus?: string;

  @property({
    type: 'boolean',
    itemType: 'boolean',
    default: false,
  })
  questionnaireSelected?: boolean;

  @property({
    type: 'boolean',
    itemType: 'boolean',
  })
  subscribe?: boolean;

  @property({
    type: 'object',
  })
  questionnaireObj?: object;

  @property({
    type: 'object',
  })
  postObj?: object;

  @property({
    type: 'object',
    itemType: 'string',
  })
  userRequest?: object;

  @property({
    type: 'object',
    itemType: 'string',
  })
  createrUserRequest?: object;

  @property({
    type: 'object',
    itemType: 'string',
  })
  finalProposalRequest?: object;

  @property({
    type: 'date',
    itemType: 'string',
    default: new Date(),
  })
  updatedTime?: string;

  @property({
    type: 'string',
  })
  paymentType?: string;

  @property({
    type: 'string',
  })
  paymentAmount?: string;

  @property({
    type: 'object',
  })
  zoomMeetingUrls?: object;

  @property({
    type: 'object',
  })
  calendarEvent?: object;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Proposal>) {
    super(data);
  }
}

export interface ProposalRelations {
  // describe navigational properties here
}

export type ProposalWithRelations = Proposal & ProposalRelations;
