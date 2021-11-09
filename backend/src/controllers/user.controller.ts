import {authenticate, TokenService} from '@loopback/authentication';
import * as nodemailer from 'nodemailer';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {
  model,
  property,
  repository,
  FilterExcludingWhere,
  Filter,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  post,
  patch,
  put,
  param,
  requestBody,
  HttpErrors,
} from '@loopback/rest';

import randomstring from 'randomstring';
import {LinkedinRepository} from '../repositories';
import {validateCredentials} from '../services';
import {
  PasswordResetRequestBody,
  UserProfileSchema,
} from './specs/user-controller.specs';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

const CredentialsSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(LinkedinRepository)
    public linkedinRepository: LinkedinRepository,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }

  @authenticate('jwt')
  @get('/whoAmI', {
    responses: {
      '200': {
        description: '',
        schema: {
          type: 'string',
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }

  @post('/signup', {
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
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    const password = await hash(newUserRequest.password, await genSalt());
    const savedUser = await this.userRepository.create(
      _.omit(newUserRequest, 'password'),
    );

    // //check
    // const existingCategoryFilter: Filter = {
    //   where: {
    //     email: newUserRequest.email,
    //   },
    // };
    // const userDetails: any = await this.linkedinRepository.findOne(
    //   existingCategoryFilter,
    // );
    // if (userDetails) {
    //   await this.linkedinRepository.updateById(userDetails.id, {
    //     password: password,
    //   });
    // }
    await this.userRepository.userCredentials(savedUser.id).create({password});

    return savedUser;
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() UserProfile: UserProfile,
  ): Promise<void> {
    return await this.userRepository.replaceById(id, UserProfile);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    UserProfile: UserProfile,
  ): Promise<void> {
    await this.userRepository.updateById(id, UserProfile);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id')
    id: string,
    @param.filter(User, {exclude: 'where'})
    filter?: FilterExcludingWhere<UserProfile>,
  ): Promise<any> {
    return await this.userRepository.findById(id, filter);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<UserProfile>,
  ): Promise<User[]> {
    return await this.userRepository.find(filter);
  }

  // @authenticate('jwt')
  @get('/profile/{id}', {
    responses: {
      '200': {
        description: '',
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async profile(
    @param.path.string('id')
    id: string,
    @inject(SecurityBindings.USER)
    @param.filter(User, {exclude: 'where'})
    filter?: FilterExcludingWhere<UserProfile>,
  ): Promise<any> {
    return await this.userRepository.findById(id, filter);
  }

  @get('/blockUsers/{id}', {
    responses: {
      '200': {
        description: '',
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async blockUsers(
    @param.path.string('id')
    id: string,
    @param.filter(User, {exclude: 'where'})
    filter?: FilterExcludingWhere<UserProfile>,
  ): Promise<any> {
    const user = await this.userRepository.findById(id);
    const blocks = user.block ? user.block : [];

    const BlockUsers = blocks.map((item: any) => {
      return this.userRepository.findById(item);
    });
    console.log('##', user);
    const userDetails = await Promise.all(BlockUsers);
    console.log('userDetails##', userDetails);
    return userDetails.map((user: any) => {
      return {
        id: user.id,
        user: user.firstName + ' ' + user.lastName,
        email: user.email,
      };
    });
  }

  @put('/users/password-reset', {
    // security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The updated user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  // @authenticate('jwt')
  async passwordReset(
    // @inject(SecurityBindings.USER)
    // currentUserProfile: UserProfile,
    @requestBody(PasswordResetRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    const {email, password} = credentials;
    // const {id} = currentUserProfile;
    // let id = 'bc70069c-e1e5-4f56-a651-13b47a7831c2';
    const existingCategoryFilter: Filter = {
      where: {
        email: email,
      },
    };
    const user = await this.userRepository.findOne(existingCategoryFilter);
    console.log('user****:', user);

    if (!user) {
      throw new HttpErrors.NotFound('User account not found');
    }

    if (email !== user?.email) {
      throw new HttpErrors.Forbidden('Invalid email address');
    }

    validateCredentials(_.pick(credentials, ['email', 'password']));
    const passwordHash = await hash(password, await genSalt());
    // const passwordHash = await this.passwordHasher.hashPassword(password);

    await this.userRepository
      .userCredentials(user.id)
      .patch({password: passwordHash});

    const userProfile = this.userService.convertToUserProfile(user);

    const token = await this.jwtService.generateToken(userProfile);
    // return {token: 'success'};
    return {token};
  }

  @put('/users/password-forgot', {
    // security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The updated user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  async passwordForgot(
    // @inject(SecurityBindings.USER)
    // currentUserProfile: UserProfile,
    @requestBody(PasswordResetRequestBody) credentials: Credentials,
  ): Promise<{msg: string}> {
    const {email} = credentials;
    const password = randomstring.generate();
    // const {id} = currentUserProfile;
    // let id = 'bc70069c-e1e5-4f56-a651-13b47a7831c2';
    const existingCategoryFilter: Filter = {
      where: {
        email: email,
      },
    };
    const user = await this.userRepository.findOne(existingCategoryFilter);
    console.log('user****:', user);

    if (!user) {
      throw new HttpErrors.NotFound('User account not found');
    }

    if (email !== user?.email) {
      throw new HttpErrors.Forbidden('Invalid email address');
    }

    // validateCredentials(_.pick(credentials, ['email', 'password']));
    const passwordHash = await hash(password, await genSalt());
    // const passwordHash = await this.passwordHasher.hashPassword(password);

    await this.userRepository
      .userCredentials(user.id)
      .patch({password: passwordHash});

    const userProfile = this.userService.convertToUserProfile(user);

    const token = await this.jwtService.generateToken(userProfile);

    let transporter = nodemailer.createTransport({
      // type: 'smtp',
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: 'jugaad123it@gmail.com',
        pass: '1234jugaad2',
      },
    });

    await transporter.sendMail({
      from: 'jugaad123it@gmail.com',
      to: email,
      subject: 'Recover Password',
      html: 'password : ' + password,
    });

    return {msg: 'success'};
    // return {password};
  }

  // async findById(
  //   @param.path.string('id') id: string,
  //   @param.filter(user, {exclude: 'where'})
  //   filter?: FilterExcludingWhere<UserProfile>,
  // ): Promise<UserProfile> {
  //   // return await this.userRepository(securityId).findById(id, filter);
  //   await this.userRepository.replaceById(id, filter);
  // }
}
