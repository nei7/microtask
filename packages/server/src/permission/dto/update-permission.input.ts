import { InputType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { PermissionEnum } from '../entities/permission.entity';

@InputType()
export class UpdatePermissionInput {
   @Field()
   resourceId: string;

   @Field()
   userId: string;

   @Field(() => [String])
   @IsEnum(PermissionEnum, { each: true })
   permissions: PermissionEnum[];
}
