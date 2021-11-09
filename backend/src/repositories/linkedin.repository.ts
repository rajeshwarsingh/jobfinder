import {DefaultCrudRepository} from '@loopback/repository';
import {Linkedin, LinkedinRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LinkedinRepository extends DefaultCrudRepository<
  Linkedin,
  typeof Linkedin.prototype.linkedinId,
  LinkedinRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(Linkedin, dataSource);
  }
}
