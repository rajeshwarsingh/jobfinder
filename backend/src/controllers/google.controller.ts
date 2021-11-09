import {v4 as uuidv4} from 'uuid';
import {inject} from '@loopback/context';
import {TokenService} from '@loopback/authentication';
import {securityId, UserProfile} from '@loopback/security';
import {
  UserRepository,
  TokenServiceBindings,
} from '@loopback/authentication-jwt';
const requestCall = require('request');
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  RestBindings,
  Request,
  Response,
} from '@loopback/rest';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import {Google} from '../models';
import {GoogleRepository} from '../repositories';
// import {linkedinConfig} from '../config/user-config';

export class GoogleController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(RestBindings.Http.RESPONSE) private res: Response,
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(GoogleRepository)
    public googleRepository: GoogleRepository,
  ) {}

  @post('/googles', {
    responses: {
      '200': {
        description: 'Google model instance',
        content: {'application/json': {schema: getModelSchemaRef(Google)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Google, {
            title: 'NewGoogle',
          }),
        },
      },
    })
    google: Google,
  ): Promise<any> {
    //check user already exit
    const existingGoogleUserFilter: Filter = {
      where: {
        email: google.email,
      },
    };

    const checkUser: any = await this.googleRepository.findOne(
      existingGoogleUserFilter,
    );
    console.log('checkUser:', google.loginType === 'signIn', checkUser);
    // IF IT IS SIGN-IN
    if (google.loginType === 'signIn') {
      if (checkUser) {
        const token = await this.jwtService.generateToken({
          name: checkUser.name,
          id: checkUser.googleId,
          email: checkUser.email,
          [securityId]: checkUser.googleId,
        });

        return {userId: checkUser.googleId, type: 'exist', token};
      } else {
        return {userId: '', type: 'new', token: ''};
      }
    }

    // IF IT'S SIGN-UP, THEN PROCCEED below
    if (checkUser) {
      return {type: 'exist', token: ''};
    }

    const existingUserFilter: Filter = {
      where: {
        email: google.email,
      },
    };

    const UserProfileDetails = {
      email: google.email,
      firstName: google.firstName,
      lastName: google.lastName,
      userLogo: {
        url: google.imageUrl,
        format: 'png',
      },
      avgRating: 1,
    };

    const user: any = await this.userRepository.findOne(existingUserFilter);
    console.log('check user for google login:', user);
    let savedUser: any = null;
    if (!user) {
      const password = await hash('randamXYZ123', await genSalt());
      savedUser = await this.userRepository.create(UserProfileDetails);
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});
    }

    google.googleId = savedUser ? savedUser.id : user.id;
    await this.googleRepository.create(google);
    return {type: 'registed', email: '', token: ''};
  }

  @get('/googles/count', {
    responses: {
      '200': {
        description: 'Google model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Google) where?: Where<Google>): Promise<Count> {
    return this.googleRepository.count(where);
  }

  @get('/googles', {
    responses: {
      '200': {
        description: 'Array of Google model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Google, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Google) filter?: Filter<Google>): Promise<Google[]> {
    return this.googleRepository.find(filter);
  }

  @patch('/googles', {
    responses: {
      '200': {
        description: 'Google PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Google, {partial: true}),
        },
      },
    })
    google: Google,
    @param.where(Google) where?: Where<Google>,
  ): Promise<Count> {
    return this.googleRepository.updateAll(google, where);
  }

  @get('/googles/{id}', {
    responses: {
      '200': {
        description: 'Google model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Google, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Google, {exclude: 'where'})
    filter?: FilterExcludingWhere<Google>,
  ): Promise<Google> {
    return this.googleRepository.findById(id, filter);
  }

  @patch('/googles/{id}', {
    responses: {
      '204': {
        description: 'Google PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Google, {partial: true}),
        },
      },
    })
    google: Google,
  ): Promise<void> {
    await this.googleRepository.updateById(id, google);
  }

  @put('/googles/{id}', {
    responses: {
      '204': {
        description: 'Google PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() google: Google,
  ): Promise<void> {
    await this.googleRepository.replaceById(id, google);
  }

  @del('/googles/{id}', {
    responses: {
      '204': {
        description: 'Google DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.googleRepository.deleteById(id);
  }
}
