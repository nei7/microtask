import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IUser } from 'src/auth/get-user.decorator';
import { PermissionEnum } from 'src/permission/entities/permission.entity';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
   constructor(
      private permissionService: PermissionService,
      private reflector: Reflector,
   ) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredPermissions = this.reflector.get<PermissionEnum[]>(
         'permissions',
         context.getHandler(),
      );

      if (!requiredPermissions) {
         return false;
      }

      const ctx = GqlExecutionContext.create(context);
      const id = ctx.getArgs().id;
      if (!id) {
         return false;
      }

      const permission = await this.permissionService.findByResourceId(id);

      if (!permission) {
         return false;
      }

      const { userId } = ctx.getContext().req.user as IUser;
      if (!userId) {
         return false;
      }
      const user = permission.users.find((user) => user._id === userId);
      if (!user) return false;

      if (
         requiredPermissions.every((permission) =>
            user.permissions.includes(permission),
         )
      ) {
         return true;
      }

      return false;
   }
}
