import { Field, ID, ObjectType } from '@nestjs/graphql';

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
}
