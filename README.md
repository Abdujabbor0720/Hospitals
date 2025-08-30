# Hospital Management System

## Overview
A comprehensive hospital management system built with NestJS, TypeORM, and PostgreSQL.

## Features
- Authentication & Authorization (JWT)
- Role-based Access Control
- Hospital, Department, Doctor Management
- Patient & Appointment Management
- Salary & Bonus Management
- Swagger API Documentation

## Technologies
- NestJS
- TypeORM
- PostgreSQL
- Swagger/OpenAPI
- JWT Authentication

## Installation

```bash
npm install
```

## Configuration
Create `.env` file:
```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=12345678
DB_DATABASE=one

JWT_SECRET=hospital_management_secret_key_2025_very_secure
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=hospital_refresh_secret_key_2025
JWT_REFRESH_EXPIRES_IN=7d
```

## Running the app

```bash
# development
npm run start:dev

# production
npm run start:prod
```

## API Documentation
Visit `http://localhost:3000/api/docs` for Swagger documentation.

## Database Setup
```bash
sudo -u postgres psql -c "CREATE DATABASE one;"
sudo -u postgres psql -c "ALTER USER postgres PASSWORD '12345678';"
```

## First Admin
Create first super admin:
```bash
POST /api/v1/auth/create-first-admin
{
  "first_name": "Admin",
  "last_name": "User",
  "email": "admin@gmail.com",
  "password": "123456",
  "phone_number": "+998901234567",
  "role": "admin"
}
```
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
