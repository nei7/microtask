import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { UserType } from 'src/user/user.type';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

export enum PermissionEnum {
   Create = 'create',
   Update = 'update',
   Delete = 'delete',
   Read = 'read',
}

registerEnumType(PermissionEnum, {
   name: 'Permission',
});

@ObjectType()
class AuthorizedUser extends UserType {
   @Field(() => [String])
   permissions: string[];
}

@Entity('permissions')
@ObjectType()
export class PermissionEntity {
   @ObjectIdColumn()
   @Field(() => ID)
   _id: string;

   @Column()
   @Field()
   resourceId: string;

   @Column()
   @Field()
   resourceOwner: string;

   @Column()
   @Field(() => [AuthorizedUser])
   users: AuthorizedUser[];
}
