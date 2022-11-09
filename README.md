# Used car pricing Api
Used car pricing Api is written by [NestJS](https://github.com/nestjs/nest) RESTful API.

- [Used car pricing Api](#used-car-pricing-api)
  - [Installation](#installation)
  - [Installing Typeorm](#installing-typeorm)
  - [Installing Validator](#installing-validator)
  - [rest Clinet](#rest-clinet)
    - [Snippets in Visual Studio Code](#snippets-in-visual-studio-code)
  - [Specifying the Runtime Environment](#specifying-the-runtime-environment)
  - [Installing the TypeORM CLI](#installing-the-typeorm-cli)
  - [Running the app](#running-the-app)
  - [Test](#test)

## Installation
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
npm i class-validator class-transformer cookie-session @types/cookie-session
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
### Snippets in Visual Studio Code
[Code snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets) are templates that make it easier to enter repeating code patterns, such as loops or conditional-statements.
User Snippets under File > Preferences (Code > Preferences on macOS)

## Specifying the Runtime Environment
```sh
npm i @nestjs/config cross-env
```
file: .env.development or .env.test
```
DB_NAME=db.sqlite
COOKIE_KEY=alskdfjlkj
```
file: src> app.module.ts
```ts
...
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [User, Report],
          synchronize: true,
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true,
    // }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
...
```
file: package.json
```js
 "start:dev": "cross-env NODE_ENV=development nest start --watch",
 "test:e2e": "cross-env NODE_ENV=test jest --config ./test/jest-e2e.json --maxWorkers=1",
```
## Installing the TypeORM CLI
[Using CLI](https://typeorm.io/using-cli):
```sh
npm install ts-node --save-dev
```
file: package.json
```json
"scripts": {
    ...
    // "typeorm": "cross-env NODE_ENV=development node --require ts-node/register ./node_modules/typeorm/cli.js"
    
    "typeorm": "typeorm-ts-node-commonjs"
}
```
```sh
npm run typeorm migration:generate -- src/db/migrations/initial-schema -d src/db/data-source.ts
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
