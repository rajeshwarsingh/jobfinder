import {authenticate} from '@loopback/authentication';
import {UserRepository} from '@loopback/authentication-jwt';
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
import {Proposal} from '../models';
import {ProposalRepository} from '../repositories';
// @authenticate('jwt')
export class ProposalController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(ProposalRepository)
    public proposalRepository: ProposalRepository,
  ) {}

  @post('/proposals', {
    responses: {
      '200': {
        description: 'Proposal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proposal)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proposal, {
            title: 'NewProposal',
          }),
        },
      },
    })
    proposal: Proposal,
  ): Promise<Proposal> {
    proposal.proposalId = uuidv4();
    return this.proposalRepository.create(proposal);
  }

  @get('/proposals/count', {
    responses: {
      '200': {
        description: 'Proposal model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Proposal) where?: Where<Proposal>): Promise<Count> {
    return this.proposalRepository.count(where);
  }

  @get('/proposals', {
    responses: {
      '200': {
        description: 'Array of Proposal model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Proposal, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Proposal) filter?: Filter<Proposal>,
  ): Promise<Proposal[]> {
    return this.proposalRepository.find(filter);
  }

  @get('/proposalsByPost/{id}', {
    responses: {
      '200': {
        description: 'Proposal model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Proposal, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findPraposalByPost(
    @param.path.string('id') id: string,
    @param.filter(Proposal, {exclude: 'where'})
    filter?: FilterExcludingWhere<Proposal>,
  ): Promise<any> {
    const proposalData = await this.proposalRepository.find({
      where: {postId: id},
    });

    console.log('proposalData&&&&&&&&&', proposalData);

    let allPromise = proposalData.map((item: any, i) => {
      return this.userRepository.findById(item.userId);
    });

    const users = await Promise.all(allPromise);

    console.log('users:', users);

    const finalResult = proposalData.map((item: any) => {
      let userDetails: any = users.find(user => user.id === item.userId);

      return {
        ...item,
        avgRating:
          userDetails && userDetails.avgRating ? userDetails.avgRating : '1',
        userId: item.userId,
        proposalId: item.proposalId,
        userName:
          (userDetails && userDetails.firstName ? userDetails.firstName : '') +
          ' ' +
          (userDetails && userDetails.lastName ? userDetails.lastName : ''),
      };
    });

    return finalResult;
  }

  @patch('/proposals', {
    responses: {
      '200': {
        description: 'Proposal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proposal, {partial: true}),
        },
      },
    })
    proposal: Proposal,
    @param.where(Proposal) where?: Where<Proposal>,
  ): Promise<Count> {
    return this.proposalRepository.updateAll(proposal, where);
  }

  @get('/proposals/{id}', {
    responses: {
      '200': {
        description: 'Proposal model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Proposal, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Proposal, {exclude: 'where'})
    filter?: FilterExcludingWhere<Proposal>,
  ): Promise<Proposal> {
    return this.proposalRepository.findById(id, filter);
  }

  @patch('/proposals/{id}', {
    responses: {
      '204': {
        description: 'Proposal PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proposal, {partial: true}),
        },
      },
    })
    proposal: Proposal,
  ): Promise<void> {
    await this.proposalRepository.updateById(id, proposal);
  }

  @put('/proposals/{id}', {
    responses: {
      '204': {
        description: 'Proposal PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() proposal: Proposal,
  ): Promise<void> {
    await this.proposalRepository.replaceById(id, proposal);
  }

  @del('/proposals/{id}', {
    responses: {
      '204': {
        description: 'Proposal DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.proposalRepository.deleteById(id);
  }
}
