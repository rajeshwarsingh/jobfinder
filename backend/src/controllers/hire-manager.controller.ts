import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {v4 as uuidv4} from 'uuid';
import {HireManager} from '../models';
import {HireManagerRepository} from '../repositories';
@authenticate('jwt')
export class HireManagerController {
  constructor(
    @repository(HireManagerRepository)
    protected hireManagerRepository: HireManagerRepository,
  ) {}

  @post('/hiremngr', {
    responses: {
      '200': {
        description: 'HireManager model instance',
        content: {'application/json': {schema: getModelSchemaRef(HireManager)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HireManager, {
            title: 'NewHireManager',
          }),
        },
      },
    })
    hireManager: HireManager,
  ): Promise<HireManager> {
    hireManager.hireMngrId = uuidv4();
    return this.hireManagerRepository.create(hireManager);
  }

  @get('/hiremngr/count', {
    responses: {
      '200': {
        description: 'HireManager model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(HireManager) where?: Where<HireManager>,
  ): Promise<Count> {
    return this.hireManagerRepository.count(where);
  }

  @get('/hiremngr', {
    responses: {
      '200': {
        description: 'Array of HireManager model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(HireManager, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(HireManager) filter?: Filter<HireManager>,
  ): Promise<HireManager[]> {
    return this.hireManagerRepository.find(filter);
  }

  @patch('/hiremngr', {
    responses: {
      '200': {
        description: 'HireManager PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HireManager, {partial: true}),
        },
      },
    })
    hireManager: HireManager,
    @param.where(HireManager) where?: Where<HireManager>,
  ): Promise<Count> {
    return this.hireManagerRepository.updateAll(hireManager, where);
  }

  @get('/hiremngr/{id}', {
    responses: {
      '200': {
        description: 'HireManager model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(HireManager, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(HireManager, {exclude: 'where'})
    filter?: FilterExcludingWhere<HireManager>,
  ): Promise<HireManager> {
    return this.hireManagerRepository.findById(id, filter);
  }

  @patch('/hiremngr/{id}', {
    responses: {
      '204': {
        description: 'HireManager PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HireManager, {partial: true}),
        },
      },
    })
    hireManager: HireManager,
  ): Promise<void> {
    await this.hireManagerRepository.updateById(id, hireManager);
  }

  @put('/hiremngr/{id}', {
    responses: {
      '204': {
        description: 'HireManager PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() hireManager: HireManager,
  ): Promise<void> {
    await this.hireManagerRepository.replaceById(id, hireManager);
  }

  @del('/hiremngr/{id}', {
    responses: {
      '204': {
        description: 'HireManager DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.hireManagerRepository.deleteById(id);
  }
}
