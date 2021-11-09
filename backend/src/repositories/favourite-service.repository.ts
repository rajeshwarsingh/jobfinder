import {DefaultCrudRepository} from '@loopback/repository';
import {FavouriteService, FavouriteServiceRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FavouriteServiceRepository extends DefaultCrudRepository<
  FavouriteService,
  typeof FavouriteService.prototype.favouriteServiceId,
  FavouriteServiceRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(FavouriteService, dataSource);
  }
}
