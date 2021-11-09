import {DefaultCrudRepository} from '@loopback/repository';
import {Service, ServiceRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ServiceRepository extends DefaultCrudRepository<
  Service,
  typeof Service.prototype.serviceId,
  ServiceRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(Service, dataSource);
  }
}
