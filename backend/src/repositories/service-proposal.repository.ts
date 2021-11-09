import {DefaultCrudRepository} from '@loopback/repository';
import {ServiceProposal, ServiceProposalRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ServiceProposalRepository extends DefaultCrudRepository<
  ServiceProposal,
  typeof ServiceProposal.prototype.serviceProposalId,
  ServiceProposalRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(ServiceProposal, dataSource);
  }
}
