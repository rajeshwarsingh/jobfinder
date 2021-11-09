import {Entity, model, property} from '@loopback/repository';

@model()
export class ServiceProposal extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  serviceProposalId?: string;

  @property({
    type: 'string',
    id: true,
  })
  serviceId?: string;

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
  paymentType?: string;

  @property({
    type: 'string',
  })
  paymentAmount?: string;

  @property({
    type: 'string',
  })
  currentProposalStatus?: string;

  @property({
    type: 'string',
  })
  clientGrade?: string;

  @property({
    type: 'string',
  })
  clientComment?: string;

  @property({
    type: 'string',
  })
  freelancerGrade?: string;

  @property({
    type: 'string',
  })
  freelancerComment?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @property({
    type: 'object',
    itemType: 'string',
  })
  createrUserRequest?: object;

  @property({
    type: 'object',
    itemType: 'string',
  })
  userRequest?: object;

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
    type: 'object',
  })
  zoomMeetingUrls?: object;

  @property({
    type: 'object',
  })
  calendarEvent?: object;

  constructor(data?: Partial<ServiceProposal>) {
    super(data);
  }
}

export interface ServiceProposalRelations {
  // describe navigational properties here
}

export type ServiceProposalWithRelations = ServiceProposal &
  ServiceProposalRelations;
