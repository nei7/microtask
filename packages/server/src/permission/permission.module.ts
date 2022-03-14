import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionResolver } from './permission.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { EventModule } from 'src/event/event.module';
import { UserModule } from 'src/user/user.module';

@Module({
   imports: [
      TypeOrmModule.forFeature([PermissionEntity]),
      EventModule,
      UserModule,
   ],
   providers: [PermissionResolver, PermissionService],
   exports: [],
})
export class PermissionModule {}
