import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/user/user.type';

@ObjectType()
export class EventType {
   @Field(() => ID)
   _id: string;

   @Field()
   name: string;

   @Field()
   description: string;

   @Field()
   color: string;

   @Field()
   startTime: number;

   @Field()
   endTime: number;

   @Field(() => UserType)
   owner: string;
}
