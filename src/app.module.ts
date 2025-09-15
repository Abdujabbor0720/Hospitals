import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientsModule } from './patients/patients.module';
import { LocationsModule } from './locations/locations.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { StaffsModule } from './staffs/staffs.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { SalariesModule } from './salaries/salaries.module';
import { BonusesModule } from './bonuses/bonuses.module';
import { DepartmentsModule } from './departments/departments.module';
import { AdminsModule } from './admins/admins.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    PatientsModule,
    LocationsModule,
    HospitalsModule,
    StaffsModule,
    AppointmentsModule,
    SalariesModule,
    BonusesModule,
    DepartmentsModule,
    AdminsModule,
    DoctorsModule,
  ],
  controllers: [RootController],
  providers: [],
})
export class AppModule { }
