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
## rest Clinet
Create file requests.http
```
### Create a new user
POST http://localhost:3000/auth/signup
content-type: application/json

{
  "email": "test50@test.com",
  "password": "12345"
}
```
shortcut for execute request in requests.http : Ctrl+Alt+R(Cmd+Alt+R for macOS)
then Ctrl+Shit+p sqlite> open Database or
run query in -- SQLite.sql  by shortcut Ctrl+Shift+q(Cmd+Shift+q for macOS)

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
