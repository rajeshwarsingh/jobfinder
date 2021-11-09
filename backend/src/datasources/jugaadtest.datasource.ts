import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// const config = {
//   name: 'jugaadtest',
//   connector: 'mongodb',
//   url: '',
//   host: 'ds117819.mlab.com',
//   port: 17819,
//   user: 'user',
//   password: 'user1234',
//   database: 'jugaadtest',
//   useNewUrlParser: true,
// };

// const config = {
//   name: 'jugaadtest',
//   connector: 'mongodb',
//   url: '',
//   host: 'ds117819.mlab.com',
//   port: 17819,
//   user: 'user',
//   password: 'user1234',
//   database: 'jugaadtest',
//   useNewUrlParser: true,
// };

// const config = {
//   name: 'Jugaad',
//   connector: 'mongodb',
//   url: 'mongodb+srv://webslayer:jugaad123@jugaad.lwctk.mongodb.net/Jugaad',
//   host: ':jugaad.lwctk.mongodb.net',
//   port: 27017,
//   user: 'webslayer',
//   password: 'jugaad123',
//   database: 'Jugaad',
//   useNewUrlParser: true,
// };
const config = {
  name: 'Jugaad',
  connector: 'mongodb',
  url: 'mongodb+srv://webslayer:jugaad123@jugaad.lwctk.mongodb.net/Jugaad',
  host: ':jugaad.lwctk.mongodb.net',
  port: 27017,
  user: 'webslayer',
  password: 'jugaad123',
  database: 'Jugaad',
  useNewUrlParser: true,
};

// mongodb+srv://webslayer:jugaad123@jugaad.lwctk.mongodb.net/Jugaad

// const config = {
//   name: 'jugaadtest',
//   connector: 'mongodb',
//   url: '',
//   host: 'localhost',
//   port: 27017,
//   user: '',
//   password: '',
//   database: 'jugaadtest',
//   useNewUrlParser: true,
// };

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class JugaadtestDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'jugaadtest';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.jugaadtest', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
