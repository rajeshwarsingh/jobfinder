import {Entity, model, property} from '@loopback/repository';

@model()
export class FraudReport extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  fraudReportId: string;

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
  userName?: string;

  @property({
    type: 'string',
  })
  fraudReportTypeId?: string;

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

  constructor(data?: Partial<FraudReport>) {
    super(data);
  }
}

export interface FraudReportRelations {
  // describe navigational properties here
}

export type FraudReportWithRelations = FraudReport & FraudReportRelations;
