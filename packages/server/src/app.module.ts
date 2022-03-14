import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EventModule } from './event/event.module';
import { EventEntity } from './event/event.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { PermissionModule } from './permission/permission.module';
import { PermissionEntity } from './permission/entities/permission.entity';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: [`.env.stage.${process.env.STAGE}`],
         validationSchema: configValidationSchema,
      }),
      TypeOrmModule.forRoot({
         type: 'mongodb',
         url: process.env.MONGO_URI,
         synchronize: true,
         useUnifiedTopology: true,
         entities: [EventEntity, UserEntity, PermissionEntity],
      }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
         include: [EventModule, AuthModule, PermissionModule],
         driver: ApolloDriver,
         autoSchemaFile: true,
      }),
      EventModule,
      AuthModule,
      UserModule,
      PermissionModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
