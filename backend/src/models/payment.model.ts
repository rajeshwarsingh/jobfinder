import {Entity, model, property} from '@loopback/repository';

@model()
export class Payment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  paymentId?: string;

  @property({
    type: 'string',
  })
  invoiceId?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  productType?: string; //post or service

  @property({
    type: 'string',
  })
  productId?: string; //serviceId or postId

  @property({
    type: 'string',
  })
  subscriptionId?: string; //serviceId or postId

  @property({
    type: 'string',
  })
  productProposalId?: string; //serviceId or postId

  @property({
    type: 'string',
  })
  productTitle?: string; //serviceId or postId

  @property({
    type: 'string',
  })
  userId?: string;

  @property({
    type: 'string',
  })
  createrUserId?: string; //serviceId or postId

  @property({
    type: 'string',
  })
  paymentType?: string; //booked or completed-paid

  @property({
    type: 'string',
  })
  typeMode?: string; //paypal pay button

  @property({
    type: 'string',
  })
  merchant?: string; //paypal

  @property({
    type: 'array',
    itemType: 'object',
  })
  paymentObj?: object[];

  @property({
    type: 'object',
  })
  zoomMeetingUrls?: object;

  @property({
    type: 'object',
  })
  productDetails?: object;

  @property({
    type: 'object',
  })
  calendarEvent?: object;

  @property({
    type: 'string',
  })
  price?: string; //price

  @property({
    type: 'string',
  })
  createdDate: string; //date of creation

  @property({
    type: 'string',
  })
  bookingAmount: string; //date of creation

  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  // describe navigational properties here
}

export type PaymentWithRelations = Payment & PaymentRelations;
