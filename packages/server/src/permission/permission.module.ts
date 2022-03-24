import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionResolver } from './permission.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { UserEntity } from 'src/user/user.entity';
import { EventEntity } from 'src/event/event.entity';
import { UserModule } from 'src/user/user.module';

@Module({
   imports: [
      TypeOrmModule.forFeature([PermissionEntity, EventEntity]),
      UserModule,
   ],
   providers: [PermissionResolver, PermissionService],
   exports: [PermissionService],
})
export class PermissionModule {}
