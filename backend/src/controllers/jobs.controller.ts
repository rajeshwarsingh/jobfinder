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
import {Jobs} from '../models';
import {JobsRepository} from '../repositories';
import {v4 as uuidv4} from 'uuid';

export class JobsController {
  constructor(
    @repository(JobsRepository)
    public jobsRepository: JobsRepository,
  ) {}

  @post('/jobs', {
    responses: {
      '200': {
        description: 'Jobs model instance',
        content: {'application/json': {schema: getModelSchemaRef(Jobs)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jobs, {
            title: 'NewJobs',
            exclude: ['jobId'],
          }),
        },
      },
    })
    jobs: Omit<Jobs, 'jobId'>,
  ): Promise<Jobs> {
    jobs.jobId = uuidv4();
    jobs.createdDate = new Date();
    return this.jobsRepository.create(jobs);
  }

  @get('/jobs/count', {
    responses: {
      '200': {
        description: 'Jobs model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Jobs) where?: Where<Jobs>): Promise<Count> {
    return this.jobsRepository.count(where);
  }

  @get('/jobs', {
    responses: {
      '200': {
        description: 'Array of Jobs model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Jobs, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Jobs) filter?: Filter<Jobs>): Promise<Jobs[]> {
    return this.jobsRepository.find(filter);
  }

  @patch('/jobs', {
    responses: {
      '200': {
        description: 'Jobs PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jobs, {partial: true}),
        },
      },
    })
    jobs: Jobs,
    @param.where(Jobs) where?: Where<Jobs>,
  ): Promise<Count> {
    return this.jobsRepository.updateAll(jobs, where);
  }

  @get('/jobs/{id}', {
    responses: {
      '200': {
        description: 'Jobs model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Jobs, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Jobs, {exclude: 'where'}) filter?: FilterExcludingWhere<Jobs>,
  ): Promise<Jobs> {
    return this.jobsRepository.findById(id, filter);
  }

  @patch('/jobs/{id}', {
    responses: {
      '204': {
        description: 'Jobs PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jobs, {partial: true}),
        },
      },
    })
    jobs: Jobs,
  ): Promise<void> {
    await this.jobsRepository.updateById(id, jobs);
  }

  @put('/jobs/{id}', {
    responses: {
      '204': {
        description: 'Jobs PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() jobs: Jobs,
  ): Promise<void> {
    await this.jobsRepository.replaceById(id, jobs);
  }

  @del('/jobs/{id}', {
    responses: {
      '204': {
        description: 'Jobs DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.jobsRepository.deleteById(id);
  }
}
