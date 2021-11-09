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
import {FavouriteService} from '../models';
import {FavouriteServiceRepository} from '../repositories';

export class FavouriteServiceController {
  constructor(
    @repository(FavouriteServiceRepository)
    public favouriteServiceRepository : FavouriteServiceRepository,
  ) {}

  @post('/favourite-services', {
    responses: {
      '200': {
        description: 'FavouriteService model instance',
        content: {'application/json': {schema: getModelSchemaRef(FavouriteService)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FavouriteService, {
            title: 'NewFavouriteService',
            
          }),
        },
      },
    })
    favouriteService: FavouriteService,
  ): Promise<FavouriteService> {
    return this.favouriteServiceRepository.create(favouriteService);
  }

  @get('/favourite-services/count', {
    responses: {
      '200': {
        description: 'FavouriteService model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(FavouriteService) where?: Where<FavouriteService>,
  ): Promise<Count> {
    return this.favouriteServiceRepository.count(where);
  }

  @get('/favourite-services', {
    responses: {
      '200': {
        description: 'Array of FavouriteService model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(FavouriteService, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(FavouriteService) filter?: Filter<FavouriteService>,
  ): Promise<FavouriteService[]> {
    return this.favouriteServiceRepository.find(filter);
  }

  @patch('/favourite-services', {
    responses: {
      '200': {
        description: 'FavouriteService PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FavouriteService, {partial: true}),
        },
      },
    })
    favouriteService: FavouriteService,
    @param.where(FavouriteService) where?: Where<FavouriteService>,
  ): Promise<Count> {
    return this.favouriteServiceRepository.updateAll(favouriteService, where);
  }

  @get('/favourite-services/{id}', {
    responses: {
      '200': {
        description: 'FavouriteService model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(FavouriteService, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FavouriteService, {exclude: 'where'}) filter?: FilterExcludingWhere<FavouriteService>
  ): Promise<FavouriteService> {
    return this.favouriteServiceRepository.findById(id, filter);
  }

  @patch('/favourite-services/{id}', {
    responses: {
      '204': {
        description: 'FavouriteService PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FavouriteService, {partial: true}),
        },
      },
    })
    favouriteService: FavouriteService,
  ): Promise<void> {
    await this.favouriteServiceRepository.updateById(id, favouriteService);
  }

  @put('/favourite-services/{id}', {
    responses: {
      '204': {
        description: 'FavouriteService PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() favouriteService: FavouriteService,
  ): Promise<void> {
    await this.favouriteServiceRepository.replaceById(id, favouriteService);
  }

  @del('/favourite-services/{id}', {
    responses: {
      '204': {
        description: 'FavouriteService DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.favouriteServiceRepository.deleteById(id);
  }
}
