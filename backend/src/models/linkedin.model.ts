import {Entity, model, property} from '@loopback/repository';

@model()
export class Linkedin extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  linkedinId?: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
  })
  loginType?: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  constructor(data?: Partial<Linkedin>) {
    super(data);
  }
}

export interface LinkedinRelations {
  // describe navigational properties here
}

export type LinkedinWithRelations = Linkedin & LinkedinRelations;
