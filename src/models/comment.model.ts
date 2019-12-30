import {Entity, model, property} from '@loopback/repository';

@model()
export class Comment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
    required: true,
  })
  agent: string;

  @property({
    type: 'string',
    required: true,
  })
  property: string;

  @property({
    type: 'string',
    required: true,
    default: 'Seller',
  })
  type: string;

  @property({
    type: 'object',
    required: true,
  })
  rate: object;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
}

export type CommentWithRelations = Comment & CommentRelations;
