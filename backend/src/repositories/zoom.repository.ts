import {DefaultCrudRepository} from '@loopback/repository';
import {Zoom, ZoomRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ZoomRepository extends DefaultCrudRepository<
  Zoom,
  typeof Zoom.prototype.zoomId,
  ZoomRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(Zoom, dataSource);
  }
}
