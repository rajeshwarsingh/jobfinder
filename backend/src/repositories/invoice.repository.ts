import {DefaultCrudRepository} from '@loopback/repository';
import {Invoice, InvoiceRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InvoiceRepository extends DefaultCrudRepository<
  Invoice,
  typeof Invoice.prototype.invoiceId,
  InvoiceRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(Invoice, dataSource);
  }
}
