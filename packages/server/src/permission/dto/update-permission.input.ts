import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePermissionInput {
   @Field()
   resourceId: string;

   @Field()
   userId: string;

   @Field(() => [String])
   permissions: string[];
}
