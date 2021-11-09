import {DefaultCrudRepository} from '@loopback/repository';
import {Follow, FollowRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FollowRepository extends DefaultCrudRepository<
  Follow,
  typeof Follow.prototype.followId,
  FollowRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(Follow, dataSource);
  }
}
