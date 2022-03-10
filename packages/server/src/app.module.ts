import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EventModule } from './event/event.module';
import { EventEntity } from './event/event.entity';

@Module({
   imports: [
      EventModule,
      TypeOrmModule.forRoot({
         type: 'mongodb',
         url: 'mongodb://localhost/microtask',
         synchronize: true,
         useUnifiedTopology: true,
         entities: [EventEntity],
      }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
         include: [EventModule],
         driver: ApolloDriver,
         autoSchemaFile: true,
      }),
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
