import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateEventInput {
   @Field()
   @IsString()
   name: string;

   @Field()
   @IsString()
   description: string;

   @Field()
   @IsString()
   color: string;

   @Field()
   @IsNumber()
   startTime: number;

   @Field()
   @IsNumber()
   endTime: number;
}
