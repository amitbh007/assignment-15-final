// Uncomment these imports to begin using these cool features!

import { authorize } from "@loopback/authorization";
import { repository } from "@loopback/repository";
import { get, getModelSchemaRef, post, requestBody, response } from "@loopback/rest";
import { genSalt, hash } from "bcryptjs";
import { permissionKeys } from "../authorization/permission-keys";
import { User } from "../models";
import { UserRepository } from "../repositories";
import { NewUserRequest } from "./user.controller";

// import {inject} from '@loopback/core';


export class MyController {
  constructor(
    @repository(UserRepository) 
    protected userRepository: UserRepository,
  ) {}

  @authorize({allowedRoles: ['ADMIN']})
  @get('/number')
  @response(200, {
    description: 'model count',
  })
  async count(
  ): Promise<number> {
    return 100;
  }

  @post('/admin-signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: User,
  ): Promise<User> {
    const password = await hash(newUserRequest.password, await genSalt());
    newUserRequest.password = password;


    const savedUser = await this.userRepository.create(newUserRequest);

    // await this.userRepository.userCredentials(savedUser.id).create({password});

    return savedUser;
  }

  // @get('/roles/count')
  // @response(200, {
  //   description: 'Role model count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async count(
  //   @param.where(Role) where?: Where<Role>,
  // ): Promise<Count> {
  //   return this.roleRepository.count(where);
  // }
}
