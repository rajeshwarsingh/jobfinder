import {DefaultCrudRepository} from '@loopback/repository';
import {Google, GoogleRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GoogleRepository extends DefaultCrudRepository<
  Google,
  typeof Google.prototype.googleId,
  GoogleRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(Google, dataSource);
  }
}
