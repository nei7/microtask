import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { PermissionEntity } from './entities/permission.entity';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User, IUser } from 'src/auth/get-user.decorator';
import { UpdatePermissionInput } from './dto/update-permission.input';

@Resolver(() => PermissionEntity)
export class PermissionResolver {
   constructor(private readonly permissionService: PermissionService) {}

   @Mutation(() => PermissionEntity)
   @UseGuards(JwtAuthGuard)
   createPermission(
      @Args('resourceId') resourceId: string,
      @User() user: IUser,
   ) {
      return this.permissionService.create(resourceId, user.userId);
   }

   @Mutation(() => PermissionEntity)
   @UseGuards(JwtAuthGuard)
   updatePermission(
      @Args('updatePermissionInput', new ValidationPipe())
      updatePermissionInput: UpdatePermissionInput,
   ) {
      return this.permissionService.updateUserPermissions(
         updatePermissionInput,
      );
   }
}
