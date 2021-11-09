import {DefaultCrudRepository} from '@loopback/repository';
import {FraudReport, FraudReportRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FraudReportRepository extends DefaultCrudRepository<
  FraudReport,
  typeof FraudReport.prototype.fraudReportId,
  FraudReportRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(FraudReport, dataSource);
  }
}
