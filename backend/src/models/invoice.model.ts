import {Entity, model, property} from '@loopback/repository';

@model()
export class Invoice extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  invoiceId?: string;

  @property({
    type: 'string',
  })
  paymentId?: string;

  @property({
    type: 'string',
  })
  productType?: string;

  @property({
    type: 'string',
  })
  productId?: string;

  @property({
    type: 'string',
  })
  productProposalId?: string;

  @property({
    type: 'string',
  })
  productTitle?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  paymentObj?: object[];

  @property({
    type: 'string',
  })
  userDetails?: string;

  @property({
    type: 'string',
  })
  createrUserDetails?: string;

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
