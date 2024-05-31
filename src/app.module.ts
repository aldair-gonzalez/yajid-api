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
import { InventoriesModule } from './inventories/inventories.module';
import { InventoriesService } from './inventories/inventories.service';
import { PackagesModule } from './packages/packages.module';
import { PackagesService } from './packages/packages.service';
import { PackageProductsModule } from './package-products/package-products.module';
import { PackageProductsService } from './package-products/package-products.service';
import { ProductAttributesModule } from './product-attributes/product-attributes.module';
import { ProductAttributesService } from './product-attributes/product-attributes.service';
import { ProductAttributeValuesModule } from './product-attribute-values/product-attribute-values.module';
import { ProductAttributeValuesService } from './product-attribute-values/product-attribute-values.service';
import { ProductImagesModule } from './product-images/product-images.module';
import { ProductImagesService } from './product-images/product-images.service';
import { PackageImagesModule } from './package-images/package-images.module';
import { PackageImagesService } from './package-images/package-images.service';
import { DiscountsModule } from './discounts/discounts.module';
import { DiscountsService } from './discounts/discounts.service';
import { ProductDiscountsModule } from './product-discounts/product-discounts.module';
import { ProductDiscountsService } from './product-discounts/product-discounts.service';
import { PackageDiscountsModule } from './package-discounts/package-discounts.module';
import { PackageDiscountsService } from './package-discounts/package-discounts.service';
import { ProductPriceHistoryModule } from './product-price-history/product-price-history.module';
import { ProductPriceHistoryService } from './product-price-history/product-price-history.service';
import { PackagePriceHistoryModule } from './package-price-history/package-price-history.module';
import { PackagePriceHistoryService } from './package-price-history/package-price-history.service';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';
import { ShoppingCartsService } from './shopping-carts/shopping-carts.service';
import { CartProductsModule } from './cart-products/cart-products.module';
import { CartProductsService } from './cart-products/cart-products.service';
import { OrderStatusModule } from './order-status/order-status.module';
import { OrderStatusService } from './order-status/order-status.service';
import { OrdersModule } from './orders/orders.module';
import { OrdersService } from './orders/orders.service';
import { OrderLinesModule } from './order-lines/order-lines.module';
import { OrderLinesService } from './order-lines/order-lines.service';
import { PurchaseStatesModule } from './purchase-states/purchase-states.module';
import { PurchaseStatesService } from './purchase-states/purchase-states.service';
import { PurchaseHistoryModule } from './purchase-history/purchase-history.module';
import { PurchaseHistoryService } from './purchase-history/purchase-history.service';
import { PurchaseDetailsModule } from './purchase-details/purchase-details.module';
import { PurchaseDetailsService } from './purchase-details/purchase-details.service';

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
    InventoriesModule,
    PackagesModule,
    PackageProductsModule,
    ProductAttributesModule,
    ProductAttributeValuesModule,
    ProductImagesModule,
    PackageImagesModule,
    DiscountsModule,
    ProductDiscountsModule,
    PackageDiscountsModule,
    ProductPriceHistoryModule,
    PackagePriceHistoryModule,
    ShoppingCartsModule,
    CartProductsModule,
    OrderStatusModule,
    OrdersModule,
    OrderLinesModule,
    PurchaseStatesModule,
    PurchaseHistoryModule,
    PurchaseDetailsModule,
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
    InventoriesService,
    PackagesService,
    PackageProductsService,
    ProductAttributesService,
    ProductAttributeValuesService,
    ProductImagesService,
    PackageImagesService,
    DiscountsService,
    ProductDiscountsService,
    PackageDiscountsService,
    ProductPriceHistoryService,
    PackagePriceHistoryService,
    ShoppingCartsService,
    CartProductsService,
    OrderStatusService,
    OrdersService,
    OrderLinesService,
    PurchaseStatesService,
    PurchaseHistoryService,
    PurchaseDetailsService,
  ],
})
export class AppModule {}
