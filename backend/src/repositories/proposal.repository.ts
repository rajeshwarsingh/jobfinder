import {DefaultCrudRepository} from '@loopback/repository';
import {Proposal, ProposalRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProposalRepository extends DefaultCrudRepository<
  Proposal,
  typeof Proposal.prototype.proposalId,
  ProposalRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(Proposal, dataSource);
  }
}
