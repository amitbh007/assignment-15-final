import {Provider} from '@loopback/context';
import { inject } from '@loopback/core';
import {repository} from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId } from '@loopback/security';
import {VerifyFunction} from 'loopback4-authentication';
import { promisify } from 'util';
import { TokenServiceBindings } from '../keys';
const jwt = require('jsonwebtoken');
import {User} from '../models/user.model';

const verifyAsync = promisify(jwt.verify);


export class BearerTokenVerifyProvider
  implements Provider<VerifyFunction.BearerFn> {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET)
    public readonly jwtSecret: string,

    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    public readonly jwtExpiresIn: string
  ) {}

  value(): VerifyFunction.BearerFn {
    return async (token:string) => {

    let userProfile: any;
    try {
        //decode user profile from token
        const decryptedToken = await verifyAsync(token, this.jwtSecret);
        //dont copy ist,exp,email
        userProfile = Object.assign(
            {
                id: '', name: '', [securityId]:""
            },
            {
                id: decryptedToken.id, name: decryptedToken.name
            }
        );
        console.log('userprofilepermis', decryptedToken.permissions)
    } catch (error) {
        throw new HttpErrors.Unauthorized(
            `Error Verifying Token :${error.message}`
        )
    }
    return userProfile;
    };
  }
}