import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { PermissionEntity } from './entities/permission.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User, IUser } from 'src/auth/get-user.decorator';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { PermissionGuard } from './permission.guard';

@Resolver(() => PermissionEntity)
export class PermissionResolver {
   constructor(private readonly permissionService: PermissionService) {}

   @Mutation(() => PermissionEntity)
   @UseGuards(JwtAuthGuard, PermissionGuard)
   createPermission(
      @Args('resourceId') resourceId: string,
      @User() user: IUser,
   ) {
      return this.permissionService.create(resourceId, user.userId);
   }

   @Mutation(() => PermissionEntity)
   @UseGuards(JwtAuthGuard, PermissionGuard)
   updatePermission(
      @Args('updatePermissionInput')
      updatePermissionInput: UpdatePermissionInput,
   ) {
      return this.permissionService.updateUserPermissions(
         updatePermissionInput,
      );
   }
}
