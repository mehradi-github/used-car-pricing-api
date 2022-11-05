# Used car pricing Api
Used car pricing Api is written by NestJS RESTful API.




## Installation
[Nest](https://github.com/nestjs/nest) is an MIT-licensed open source project.
```sh
nest new used-car-pricing-api
nest g module users
nest g module reports
nest g controller users
nest g controller reports
nest g service users
nest g service reports
```
## Installing Typeorm
```sh
npm i @nestjs/typeorm typeorm sqlite3 
```
> app.module.ts
```javascript 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
```
## Installing Validator
```sh
npm i class-validator class-transformer 
```

## Running the app

```sh
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```sh
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
