import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from 'src/permission/permission.module';

import { UserModule } from 'src/user/user.module';
import { EventEntity } from './event.entity';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
   imports: [
      TypeOrmModule.forFeature([EventEntity]),
      UserModule,
      PermissionModule,
   ],
   providers: [EventService, EventResolver],
   exports: [EventService],
})
export class EventModule {}
