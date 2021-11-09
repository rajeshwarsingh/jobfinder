import {DefaultCrudRepository} from '@loopback/repository';
import {Jobs, JobsRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class JobsRepository extends DefaultCrudRepository<
  Jobs,
  typeof Jobs.prototype.jobId,
  JobsRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(Jobs, dataSource);
  }
}
