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
import { UserAddressesModule } from './user-addresses/user-addresses.module';
import { UserAddressesService } from './user-addresses/user-addresses.service';
import { ActivityTypesModule } from './activity-types/activity-types.module';
import { ActivityTypesService } from './activity-types/activity-types.service';
import { UserActivityLogModule } from './user-activity-log/user-activity-log.module';
import { UserActivityLogService } from './user-activity-log/user-activity-log.service';
import { BrandsModule } from './brands/brands.module';
import { BrandsService } from './brands/brands.service';
import { DepartmentsModule } from './departments/departments.module';
import { DepartmentsService } from './departments/departments.service';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesService } from './categories/categories.service';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { SubcategoriesService } from './subcategories/subcategories.service';
import { SuppliersModule } from './suppliers/suppliers.module';
import { SuppliersService } from './suppliers/suppliers.service';
import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';

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
    ActivityTypesModule,
    UserActivityLogModule,
    BrandsModule,
    DepartmentsModule,
    CategoriesModule,
    SubcategoriesModule,
    SuppliersModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [
    UsersService,
    RolesService,
    UserRolesService,
    AddressTypesService,
    UserAddressesService,
    ActivityTypesService,
    UserActivityLogService,
    BrandsService,
    DepartmentsService,
    CategoriesService,
    SubcategoriesService,
    SuppliersService,
    ProductsService,
  ],
})
export class AppModule {}
