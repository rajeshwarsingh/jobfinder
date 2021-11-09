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
import {ServiceProposal} from '../models';
import {ServiceProposalRepository} from '../repositories';

export class ServiceProposalController {
  constructor(
    @repository(ServiceProposalRepository)
    public serviceProposalRepository: ServiceProposalRepository,
  ) {}

  @post('/service-proposals', {
    responses: {
      '200': {
        description: 'ServiceProposal model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(ServiceProposal)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceProposal, {
            title: 'NewServiceProposal',
            exclude: ['serviceProposalId'],
          }),
        },
      },
    })
    serviceProposal: Omit<ServiceProposal, 'serviceProposalId'>,
  ): Promise<ServiceProposal> {
    return this.serviceProposalRepository.create(serviceProposal);
  }

  @get('/service-proposals/count', {
    responses: {
      '200': {
        description: 'ServiceProposal model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ServiceProposal) where?: Where<ServiceProposal>,
  ): Promise<Count> {
    return this.serviceProposalRepository.count(where);
  }

  @get('/service-proposals', {
    responses: {
      '200': {
        description: 'Array of ServiceProposal model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ServiceProposal, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ServiceProposal) filter?: Filter<ServiceProposal>,
  ): Promise<ServiceProposal[]> {
    return this.serviceProposalRepository.find(filter);
  }

  @patch('/service-proposals', {
    responses: {
      '200': {
        description: 'ServiceProposal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceProposal, {partial: true}),
        },
      },
    })
    serviceProposal: ServiceProposal,
    @param.where(ServiceProposal) where?: Where<ServiceProposal>,
  ): Promise<Count> {
    return this.serviceProposalRepository.updateAll(serviceProposal, where);
  }

  @get('/service-proposals/{id}', {
    responses: {
      '200': {
        description: 'ServiceProposal model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServiceProposal, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ServiceProposal, {exclude: 'where'})
    filter?: FilterExcludingWhere<ServiceProposal>,
  ): Promise<ServiceProposal> {
    return this.serviceProposalRepository.findById(id, filter);
  }

  @patch('/service-proposals/{id}', {
    responses: {
      '204': {
        description: 'ServiceProposal PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceProposal, {partial: true}),
        },
      },
    })
    serviceProposal: ServiceProposal,
  ): Promise<void> {
    await this.serviceProposalRepository.updateById(id, serviceProposal);
  }

  @put('/service-proposals/{id}', {
    responses: {
      '204': {
        description: 'ServiceProposal PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() serviceProposal: ServiceProposal,
  ): Promise<void> {
    await this.serviceProposalRepository.replaceById(id, serviceProposal);
  }

  @del('/service-proposals/{id}', {
    responses: {
      '204': {
        description: 'ServiceProposal DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.serviceProposalRepository.deleteById(id);
  }
}
