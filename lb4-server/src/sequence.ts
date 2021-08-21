import {inject} from '@loopback/context';
import { repository } from '@loopback/repository';
import {
  FindRoute,
  HttpErrors,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import {AuthenticateFn, AuthenticationBindings} from 'loopback4-authentication';
import {
  AuthorizationBindings,
  AuthorizeErrorKeys,
  AuthorizeFn,
  UserPermissionsFn,
} from 'loopback4-authorization';
import { TokenServiceBindings, UserServiceBindings } from './keys';
import { Role } from './models';

import {User} from './models/user.model';
import { RoleRepository, UserRepository } from './repositories';
import { JWTService } from './services/jwt-service';
import { MyuserService } from './services/user-service';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(RoleRepository) protected roleRepository: RoleRepository,
    @inject(AuthorizationBindings.AUTHORIZE_ACTION)
    protected checkAuthorisation: AuthorizeFn,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyuserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) {}

  async handle(context: RequestContext) {
    const requestTime = Date.now();
    try {
      const {request, response} = context;

        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        response.header('Access-Control-Allow-Methods', '*');
        // response.status(200);
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);
      request.body = args[args.length - 1];

      console.log("hit",request.headers);
      let permissions :any = ["general"];

      if(request.method=="OPTIONS"){
          response.status(200);
      }
      if(request.headers.authorization){
        //   this.userService.verifyCredentials({email:})

        const uid = request.headers.authorization.split(" ")[1];
        const up:UserProfile = await this.jwtService.verifyToken(uid);
        console.log("user from req",up)
        const user:User = await this.userRepository.findById(Number((up as any).id));
        //get the role permissions from user 

        // "generalAuth",
        // "advancedAuth",
        // "completeAuth"

        const role:Role = await this.roleRepository.findById(Number(user.roleKey));

        console.log("role",role)

        if(role.permissions?.length){
            permissions = [...permissions,...role.permissions]
        }   

      }
      
      console.log("permissions",permissions);
      const isAccessAllowed: boolean = await this.checkAuthorisation(
        permissions, // do authUser.permissions if using method #1
        request,
      );

      console.log("isaccess-allowed",isAccessAllowed);
   
      if (!isAccessAllowed) {
        throw new HttpErrors.Forbidden(AuthorizeErrorKeys.NotAllowedAccess);
      }

      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      this.reject(context, err);
    }
  }
}