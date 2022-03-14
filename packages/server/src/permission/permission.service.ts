import {
   ForbiddenException,
   Injectable,
   NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventService } from 'src/event/event.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { PermissionEntity } from './entities/permission.entity';

@Injectable()
export class PermissionService {
   constructor(
      @InjectRepository(PermissionEntity)
      private permissionRepository: Repository<PermissionEntity>,
      private eventService: EventService,
      private userService: UserService,
   ) {}

   async create(resourceId: string, ownerId: string) {
      const resource = await this.eventService.findById(resourceId);
      if (!resource) {
         throw new NotFoundException(
            `Cant find resource with id ${resourceId}`,
         );
      }
      if (resource.owner !== ownerId) {
         throw new ForbiddenException();
      }

      const permission = this.permissionRepository.create({
         resourceId,
         resourceOwner: ownerId,
         users: [],
      });

      return this.permissionRepository.save(permission);
   }

   async updateUserPermissions(updatePermissionInput: UpdatePermissionInput) {
      const permission = await this.permissionRepository.findOne({
         resourceId: updatePermissionInput.resourceId,
      });

      const authorizedUser = permission.users.find(
         (user) => user._id === updatePermissionInput.userId,
      );
      if (authorizedUser) {
         authorizedUser.permissions = updatePermissionInput.permissions;
      } else {
         const { _id, password, ...rest } = await this.userService.findById(
            updatePermissionInput.userId,
         );

         permission.users.push({
            _id: _id.toString(),
            ...rest,
            permissions: updatePermissionInput.permissions,
         });
      }

      return this.permissionRepository.save(permission);
   }

   findById(id: string) {
      return this.permissionRepository.findOne(id);
   }
}
