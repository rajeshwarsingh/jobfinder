import {DefaultCrudRepository} from '@loopback/repository';
import {FavouriteUser, FavouriteUserRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FavouriteUserRepository extends DefaultCrudRepository<
  FavouriteUser,
  typeof FavouriteUser.prototype.favouriteUserId,
  FavouriteUserRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(FavouriteUser, dataSource);
  }
}
