import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IUser } from 'src/auth/get-user.decorator';
import { PermissionService } from './permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
   constructor(
      private permissionService: PermissionService,
      private reflector: Reflector,
   ) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredPermission = this.reflector.get<string>(
         'permission',
         context.getHandler(),
      );
      if (!requiredPermission) {
         return true;
      }

      const ctx = GqlExecutionContext.create(context);
      const [firstKey] = Object.keys(ctx.getArgs());

      const input = ctx.getArgs()[firstKey];
      if (input) return false;

      const permission = await this.permissionService.findById(
         input.resourceId,
      );
      if (!permission) {
         return true;
      }

      const user = ctx.getContext().req.user as IUser;
      if (!user) {
         return false;
      }
      if (user.userId !== permission.resourceOwner) return false;

      return true;
   }
}
