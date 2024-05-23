import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';

import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { RolesService } from './roles/roles.service';
import { UserRolesModule } from './user-roles/user-roles.module';
import { UserRolesService } from './user-roles/user-roles.service';
import { AddressTypesModule } from './address-types/address-types.module';
import { AddressTypesService } from './address-types/address-types.service';
import { UserAddressesModule } from './user_addresses/user_addresses.module';
import { UserAddressesService } from './user_addresses/user_addresses.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.development.local',
        '.env.test.local',
        '.env.production.local',
        '.env.development',
        '.env.test',
        '.env.production',
      ],
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'mysql',
        ...configuration().database,
        entities: [],
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    RolesModule,
    UserRolesModule,
    AddressTypesModule,
    UserAddressesModule,
  ],
  controllers: [],
  providers: [
    UsersService,
    RolesService,
    UserRolesService,
    AddressTypesService,
    UserAddressesService,
  ],
})
export class AppModule {}
