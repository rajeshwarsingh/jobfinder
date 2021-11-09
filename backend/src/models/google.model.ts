import {Entity, model, property} from '@loopback/repository';

@model()
export class Google extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  googleId?: string;

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
  loginType?: string; //signIn or signUp

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
  })
  imageUrl?: string;

  constructor(data?: Partial<Google>) {
    super(data);
  }
}

export interface GoogleRelations {
  // describe navigational properties here
}

export type GoogleWithRelations = Google & GoogleRelations;
