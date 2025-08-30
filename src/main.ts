import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Hospital Management System API')
    .setDescription('Complete Hospital Management System with Authentication')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Authentication', 'Auth endpoints for login/register')
    .addTag('Doctors', 'Doctor management endpoints')
    .addTag('Patients', 'Patient management endpoints')
    .addTag('Appointments', 'Appointment management endpoints')
    .addTag('Salaries', 'Salary management endpoints')
    .addTag('Bonuses', 'Bonus management endpoints')
    .addTag('Admins', 'Admin management endpoints')
    .addTag('Staffs', 'Staff management endpoints')
    .addTag('Hospitals', 'Hospital management endpoints')
    .addTag('Locations', 'Location management endpoints')
    .addTag('Departments', 'Department management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server running on port 3000`);
    console.log(`Swagger docs available at http://localhost:3000/api/docs`);
  });
}
bootstrap();
