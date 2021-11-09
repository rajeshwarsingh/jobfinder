import {DefaultCrudRepository} from '@loopback/repository';
import {Freelancer, FreelancerRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FreelancerRepository extends DefaultCrudRepository<
  Freelancer,
  typeof Freelancer.prototype.freelancerId,
  FreelancerRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(Freelancer, dataSource);
  }
}
