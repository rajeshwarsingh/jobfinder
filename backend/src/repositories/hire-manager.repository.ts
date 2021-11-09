import {DefaultCrudRepository} from '@loopback/repository';
import {HireManager, HireManagerRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class HireManagerRepository extends DefaultCrudRepository<
  HireManager,
  typeof HireManager.prototype.hireMngrId,
  HireManagerRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(HireManager, dataSource);
  }
}
