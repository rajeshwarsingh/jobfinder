import {DefaultCrudRepository} from '@loopback/repository';
import {Wishlist, WishlistRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class WishlistRepository extends DefaultCrudRepository<
  Wishlist,
  typeof Wishlist.prototype.wishlistId,
  WishlistRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(Wishlist, dataSource);
  }
}
