import {
   BadRequestException,
   ForbiddenException,
   Injectable,
   NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { PermissionEntity } from './entities/permission.entity';

@Injectable()
export class PermissionService {
   constructor(
      @InjectRepository(PermissionEntity)
      private permissionRepository: Repository<PermissionEntity>,
      @InjectRepository(EventEntity)
      private eventRepository: Repository<EventEntity>,

      private userService: UserService,
   ) {}

   async create(resourceId: string, ownerId: string) {
      if (!resourceId) {
         throw new BadRequestException("resourceId can't be empty");
      }

      const resource = await this.eventRepository.findOne(resourceId);
      if (!resource) {
         throw new NotFoundException(
            `Cant find resource with id ${resourceId}`,
         );
      }

      const findPermission = await this.permissionRepository.findOne({
         resourceId,
      });
      if (findPermission) {
         throw new BadRequestException('Already exists');
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

   findByResourceId(id: string) {
      return this.permissionRepository.findOne({ resourceId: id });
   }
}
