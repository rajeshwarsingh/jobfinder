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
import {Freelancer} from '../models';
import {FreelancerRepository} from '../repositories';
@authenticate('jwt')
export class FreelancerController {
  constructor(
    @repository(FreelancerRepository)
    public freelancerRepository: FreelancerRepository,
  ) {}

  @post('/freelancers', {
    responses: {
      '200': {
        description: 'Freelancer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Freelancer)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Freelancer, {
            title: 'NewFreelancer',
          }),
        },
      },
    })
    freelancer: Freelancer,
  ): Promise<Freelancer> {
    freelancer.freelancerId = uuidv4();
    return this.freelancerRepository.create(freelancer);
  }

  @get('/freelancers/count', {
    responses: {
      '200': {
        description: 'Freelancer model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Freelancer) where?: Where<Freelancer>,
  ): Promise<Count> {
    return this.freelancerRepository.count(where);
  }

  @get('/freelancers', {
    responses: {
      '200': {
        description: 'Array of Freelancer model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Freelancer, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Freelancer) filter?: Filter<Freelancer>,
  ): Promise<Freelancer[]> {
    return this.freelancerRepository.find(filter);
  }

  @patch('/freelancers', {
    responses: {
      '200': {
        description: 'Freelancer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Freelancer, {partial: true}),
        },
      },
    })
    freelancer: Freelancer,
    @param.where(Freelancer) where?: Where<Freelancer>,
  ): Promise<Count> {
    return this.freelancerRepository.updateAll(freelancer, where);
  }

  @get('/freelancers/{id}', {
    responses: {
      '200': {
        description: 'Freelancer model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Freelancer, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Freelancer, {exclude: 'where'})
    filter?: FilterExcludingWhere<Freelancer>,
  ): Promise<Freelancer> {
    return this.freelancerRepository.findById(id, filter);
  }

  @patch('/freelancers/{id}', {
    responses: {
      '204': {
        description: 'Freelancer PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Freelancer, {partial: true}),
        },
      },
    })
    freelancer: Freelancer,
  ): Promise<void> {
    await this.freelancerRepository.updateById(id, freelancer);
  }

  @put('/freelancers/{id}', {
    responses: {
      '204': {
        description: 'Freelancer PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() freelancer: Freelancer,
  ): Promise<void> {
    await this.freelancerRepository.replaceById(id, freelancer);
  }

  @del('/freelancers/{id}', {
    responses: {
      '204': {
        description: 'Freelancer DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.freelancerRepository.deleteById(id);
  }
}
