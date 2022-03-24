import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetEventsInput {
   @Field({ nullable: true })
   startTime?: number;

   @Field({ nullable: true })
   endTime?: number;
}
