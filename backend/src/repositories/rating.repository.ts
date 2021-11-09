import {DefaultCrudRepository} from '@loopback/repository';
import {Rating, RatingRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RatingRepository extends DefaultCrudRepository<
  Rating,
  typeof Rating.prototype.ratingId,
  RatingRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(Rating, dataSource);
  }
}
