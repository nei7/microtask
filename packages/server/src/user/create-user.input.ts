import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
   @Field()
   @IsString()
   @Length(2, 20)
   username: string;

   @Field()
   @IsEmail()
   email: string;

   @Field()
   @IsString()
   @Length(4)
   password: string;
}
