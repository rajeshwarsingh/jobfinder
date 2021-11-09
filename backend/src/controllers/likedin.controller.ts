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
import {Linkedin} from '../models';
import {LinkedinRepository} from '../repositories';
import {linkedinConfig} from '../config/user-config';
export class LikedinIdController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(RestBindings.Http.RESPONSE) private res: Response,
    @repository(LinkedinRepository)
    public linkedinRepository: LinkedinRepository,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @post('/linkedins', {
    responses: {
      '200': {
        description: 'Linkedin model instance',
        content: {'application/json': {schema: getModelSchemaRef(Linkedin)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Linkedin, {
            title: 'NewLinkedin',
          }),
        },
      },
    })
    linkedin: Linkedin,
  ): Promise<any> {
    // user info from linkedin api with valid code
    const accessInfo: any = await new Promise((resolve, reject) => {
      var options = {
        method: 'POST',
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          grant_type: 'authorization_code',
          code: linkedin.code,
          redirect_uri: linkedinConfig.redirect_uri,
          client_id: linkedinConfig.client_id,
          client_secret: linkedinConfig.client_secret,
        },
      };
      requestCall(options, function (error: any, response: any) {
        if (error) throw new Error(error);
        let body = JSON.parse(response.body);
        return resolve(body);
      });
    });

    // ----------------------------------------
    // get user email and other information from linkedin api
    const userdetails: any = await new Promise((resolve, reject) => {
      // var request = require('request');
      var options = {
        method: 'GET',
        url:
          'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,emailAddress,profilePicture(displayImage~:playableStreams))',
        headers: {
          Authorization: `Bearer ${accessInfo.access_token}`,
        },
      };

      requestCall(options, function (error: any, response: any) {
        console.log(
          '###################################',
          error,
          response.body,
        );
        if (error) throw new Error(error);
        let body = JSON.parse(response.body);
        return resolve(body);
      });
    });

    //----------------------------------------

    // get user email and other information from linkedin api
    const userEmailInfo: any = await new Promise((resolve, reject) => {
      // var request = require('request');
      var options = {
        method: 'GET',
        url:
          'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
        headers: {
          Authorization: `Bearer ${accessInfo.access_token}`,
        },
      };

      requestCall(options, function (error: any, response: any) {
        if (error) throw new Error(error);
        let body = JSON.parse(response.body);
        return resolve(body);
      });
    });

    console.log('#######################', userEmailInfo);

    //get EMail of user
    let email = '';
    userEmailInfo.elements.forEach((item: any) => {
      if (item['handle~'] && item['handle~']['emailAddress']) {
        email = item['handle~']['emailAddress'];
      }
    });

    //userInfo
    linkedin.email = email;

    //check user already exit
    const existingLinkedinUserFilter: Filter = {
      where: {
        email: email,
      },
    };

    const checkUser: any = await this.linkedinRepository.findOne(
      existingLinkedinUserFilter,
    );
    console.log('checkUser:', linkedin.loginType === 'signIn', checkUser);
    // IF IT IS SIGN-IN
    if (linkedin.loginType === 'signIn') {
      if (checkUser) {
        const token = await this.jwtService.generateToken({
          name: checkUser.name,
          id: checkUser.linkedinId,
          email: checkUser.email,
          [securityId]: checkUser.linkedinId,
        });

        return {userId: checkUser.linkedinId, type: 'exist', token};
      } else {
        // return {userId: '', type: 'new', token: ''};
      }
    }

    // IF IT'S SIGN-UP, THEN PROCCEED below
    if (checkUser) {
      return {type: 'exist', token: ''};
    }

    const existingUserFilter: Filter = {
      where: {
        email: email,
      },
    };

    const UserProfileDetails = {
      email,
      firstName:
        userdetails.localizedFirstName ||
        userdetails.firstName.localized[
          userdetails.firstName.preferredLocale['language'] +
            '_' +
            userdetails.firstName.preferredLocale['country']
        ],
      lastName:
        userdetails.lastName.localized[
          userdetails.lastName.preferredLocale['language'] +
            '_' +
            userdetails.lastName.preferredLocale['country']
        ],
      userLogo: {
        url:
          userdetails.profilePicture &&
          userdetails.profilePicture['displayImage~']
            ? userdetails.profilePicture['displayImage~']['elements'][0][
                'identifiers'
              ][0]['identifier']
            : '',
        format: 'png',
      },
      nationality: userdetails.lastName.preferredLocale['country'],
      language: userdetails.lastName.preferredLocale['language'],
      avgRating: 1,
    };

    const user: any = await this.userRepository.findOne(existingUserFilter);
    console.log('###############step1', user);
    let savedUser: any = null;
    if (!user) {
      const password = await hash(accessInfo.access_token, await genSalt());
      savedUser = await this.userRepository.create(UserProfileDetails);
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});
    }

    linkedin.linkedinId = savedUser ? savedUser.id : user.id;
    await this.linkedinRepository.create(linkedin);
    const newToken = await this.jwtService.generateToken({
      // @ts-ignore
      name: linkedin.name,
      id: linkedin.linkedinId,
      email: linkedin.email,
      // @ts-ignore
      [securityId]: linkedin.linkedinId,
    });
    return {
      type: 'registed',
      userId: linkedin.linkedinId,
      email: '',
      token: newToken,
    };
  }

  @get('/linkedins/count', {
    responses: {
      '200': {
        description: 'Linkedin model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Linkedin) where?: Where<Linkedin>): Promise<Count> {
    return this.linkedinRepository.count(where);
  }

  @get('/linkedins', {
    responses: {
      '200': {
        description: 'Array of Linkedin model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Linkedin, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Linkedin) filter?: Filter<Linkedin>,
  ): Promise<Linkedin[]> {
    return this.linkedinRepository.find(filter);
  }

  @patch('/linkedins', {
    responses: {
      '200': {
        description: 'Linkedin PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Linkedin, {partial: true}),
        },
      },
    })
    linkedin: Linkedin,
    @param.where(Linkedin) where?: Where<Linkedin>,
  ): Promise<Count> {
    return this.linkedinRepository.updateAll(linkedin, where);
  }

  @get('/linkedins/{id}', {
    responses: {
      '200': {
        description: 'Linkedin model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Linkedin, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Linkedin, {exclude: 'where'})
    filter?: FilterExcludingWhere<Linkedin>,
  ): Promise<Linkedin> {
    return this.linkedinRepository.findById(id, filter);
  }

  @patch('/linkedins/{id}', {
    responses: {
      '204': {
        description: 'Linkedin PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Linkedin, {partial: true}),
        },
      },
    })
    linkedin: Linkedin,
  ): Promise<void> {
    await this.linkedinRepository.updateById(id, linkedin);
  }

  @put('/linkedins/{id}', {
    responses: {
      '204': {
        description: 'Linkedin PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() linkedin: Linkedin,
  ): Promise<void> {
    await this.linkedinRepository.replaceById(id, linkedin);
  }

  @del('/linkedins/{id}', {
    responses: {
      '204': {
        description: 'Linkedin DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.linkedinRepository.deleteById(id);
  }
}
