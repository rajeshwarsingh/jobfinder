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
import {FraudReport} from '../models';
import {FraudReportRepository} from '../repositories';
import {v4 as uuidv4} from 'uuid';
export class FraudReportController {
  constructor(
    @repository(FraudReportRepository)
    public fraudReportRepository: FraudReportRepository,
  ) {}

  @post('/fraud-reports', {
    responses: {
      '200': {
        description: 'FraudReport model instance',
        content: {'application/json': {schema: getModelSchemaRef(FraudReport)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FraudReport, {
            title: 'NewFraudReport',
            exclude: ['fraudReportId'],
          }),
        },
      },
    })
    fraudReport: FraudReport,
  ): Promise<FraudReport> {
    fraudReport.fraudReportId = uuidv4();
    fraudReport.createdDate = new Date().toString();
    return this.fraudReportRepository.create(fraudReport);
  }

  @get('/fraud-reports/count', {
    responses: {
      '200': {
        description: 'FraudReport model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(FraudReport) where?: Where<FraudReport>,
  ): Promise<Count> {
    return this.fraudReportRepository.count(where);
  }

  @get('/fraud-reports', {
    responses: {
      '200': {
        description: 'Array of FraudReport model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(FraudReport, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(FraudReport) filter?: Filter<FraudReport>,
  ): Promise<FraudReport[]> {
    return this.fraudReportRepository.find(filter);
  }

  @patch('/fraud-reports', {
    responses: {
      '200': {
        description: 'FraudReport PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FraudReport, {partial: true}),
        },
      },
    })
    fraudReport: FraudReport,
    @param.where(FraudReport) where?: Where<FraudReport>,
  ): Promise<Count> {
    return this.fraudReportRepository.updateAll(fraudReport, where);
  }

  @get('/fraud-reports/{id}', {
    responses: {
      '200': {
        description: 'FraudReport model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(FraudReport, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FraudReport, {exclude: 'where'})
    filter?: FilterExcludingWhere<FraudReport>,
  ): Promise<FraudReport> {
    return this.fraudReportRepository.findById(id, filter);
  }

  @patch('/fraud-reports/{id}', {
    responses: {
      '204': {
        description: 'FraudReport PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FraudReport, {partial: true}),
        },
      },
    })
    fraudReport: FraudReport,
  ): Promise<void> {
    await this.fraudReportRepository.updateById(id, fraudReport);
  }

  @put('/fraud-reports/{id}', {
    responses: {
      '204': {
        description: 'FraudReport PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() fraudReport: FraudReport,
  ): Promise<void> {
    await this.fraudReportRepository.replaceById(id, fraudReport);
  }

  @del('/fraud-reports/{id}', {
    responses: {
      '204': {
        description: 'FraudReport DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.fraudReportRepository.deleteById(id);
  }
}
