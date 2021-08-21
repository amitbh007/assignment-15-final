import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Role extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    // required: true,
  })
  key?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => User, {keyTo: 'roleKey'})
  users: User[];

  @property.array(String)
  permissions?: String[];

  [prop: string]: any;


  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
