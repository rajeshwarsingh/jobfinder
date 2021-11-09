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
} from '@loopback/rest';
import {v4 as uuidv4} from 'uuid';
import {FavouriteUser} from '../models';
import {FavouriteUserRepository} from '../repositories';

export class FavouriteUserController {
  constructor(
    @repository(FavouriteUserRepository)
    public favouriteUserRepository: FavouriteUserRepository,
  ) {}

  @post('/favourite-users', {
    responses: {
      '200': {
        description: 'FavouriteUser model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(FavouriteUser)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FavouriteUser, {
            title: 'NewFavouriteUser',
          }),
        },
      },
    })
    favouriteUser: FavouriteUser,
  ): Promise<FavouriteUser> {
    return this.favouriteUserRepository.create(favouriteUser);
  }

  @get('/favourite-users/count', {
    responses: {
      '200': {
        description: 'FavouriteUser model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(FavouriteUser) where?: Where<FavouriteUser>,
  ): Promise<Count> {
    return this.favouriteUserRepository.count(where);
  }

  @get('/favourite-users', {
    responses: {
      '200': {
        description: 'Array of FavouriteUser model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(FavouriteUser, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(FavouriteUser) filter?: Filter<FavouriteUser>,
  ): Promise<FavouriteUser[]> {
    return this.favouriteUserRepository.find(filter);
  }

  @patch('/favourite-users', {
    responses: {
      '200': {
        description: 'FavouriteUser PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FavouriteUser, {partial: true}),
        },
      },
    })
    favouriteUser: FavouriteUser,
    @param.where(FavouriteUser) where?: Where<FavouriteUser>,
  ): Promise<Count> {
    return this.favouriteUserRepository.updateAll(favouriteUser, where);
  }

  @get('/favourite-users/{id}', {
    responses: {
      '200': {
        description: 'FavouriteUser model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(FavouriteUser, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FavouriteUser, {exclude: 'where'})
    filter?: FilterExcludingWhere<FavouriteUser>,
  ): Promise<FavouriteUser> {
    return this.favouriteUserRepository.findById(id, filter);
  }

  @patch('/favourite-users/{id}', {
    responses: {
      '204': {
        description: 'FavouriteUser PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FavouriteUser, {partial: true}),
        },
      },
    })
    favouriteUser: FavouriteUser,
  ): Promise<void> {
    await this.favouriteUserRepository.updateById(id, favouriteUser);
  }

  @put('/favourite-users/{id}', {
    responses: {
      '204': {
        description: 'FavouriteUser PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() favouriteUser: FavouriteUser,
  ): Promise<void> {
    await this.favouriteUserRepository.replaceById(id, favouriteUser);
  }

  @del('/favourite-users/{id}', {
    responses: {
      '204': {
        description: 'FavouriteUser DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.favouriteUserRepository.deleteById(id);
  }
}
