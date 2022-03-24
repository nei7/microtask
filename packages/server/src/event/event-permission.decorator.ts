import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionEnum } from 'src/permission/entities/permission.entity';
import { PermissionGuard } from './permission.guard';

export const Permission = (...permissions: PermissionEnum[]) =>
   applyDecorators(
      SetMetadata('permissions', permissions),
      UseGuards(JwtAuthGuard, PermissionGuard),
   );
