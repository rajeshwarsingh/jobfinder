import {DefaultCrudRepository} from '@loopback/repository';
import {Payment, PaymentRelations} from '../models';
import {JugaadtestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.paymentId,
  PaymentRelations
> {
  constructor(
    @inject('datasources.jugaadtest') dataSource: JugaadtestDataSource,
  ) {
    super(Payment, dataSource);
  }
}
