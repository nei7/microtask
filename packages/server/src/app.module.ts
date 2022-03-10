import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EventModule } from './event/event.module';
import { EventEntity } from './event/event.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';

@Module({
   imports: [
      TypeOrmModule.forRoot({
         type: 'mongodb',
         url: 'mongodb://localhost/microtask',
         synchronize: true,
         useUnifiedTopology: true,
         entities: [EventEntity, UserEntity],
      }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
         include: [EventModule, AuthModule],
         driver: ApolloDriver,
         autoSchemaFile: true,
      }),
      EventModule,
      AuthModule,
      UserModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
