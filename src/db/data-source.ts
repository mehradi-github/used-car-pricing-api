import { DataSource, DataSourceOptions } from 'typeorm';

let dataSourceOptions: DataSourceOptions;
//  = {
//   synchronize: false,
//   migrations: ['migrations/*.js'],
//   cli: {
//     migrationsDir: 'migrations',
//   },
// };

switch (process.env.NODE_ENV) {
  case 'development':
    dataSourceOptions = {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
      migrations: ['migrations/*.js'],
      synchronize: false,
    };
    break;
  case 'test':
    dataSourceOptions = {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrations: ['migrations/*.js'],
      synchronize: false,
      migrationsRun: true,
    };
    break;
  case 'production':
    dataSourceOptions = {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['**/*.entity.js'],
      migrations: ['migrations/*.js'],
      synchronize: false,
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false,
      },
    };
    break;
  default:
    throw new Error('unknown environment');
}
export { dataSourceOptions };

// export const dataSourceOptions: DataSourceOptions = {
//   type: 'sqlite',
//   database: 'test.sqlite',
//   entities: ['**/*.entity.ts'],
//   migrations: ['migrations/*.js'],
//   synchronize: false,
//   migrationsRun: true,
// };
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

// module.exports = dbConfig;
