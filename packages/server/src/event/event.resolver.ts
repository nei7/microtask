import { UseGuards } from '@nestjs/common';
import {
   Args,
   Context,
   Mutation,
   Parent,
   Query,
   ResolveField,
   Resolver,
} from '@nestjs/graphql';
import { User, IUser } from 'src/auth/get-user.decorator';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateEventInput } from './create-event.input';
import { EventEntity } from './event.entity';
import { EventService } from './event.service';
import { EventType } from './event.type';
import { GetEventsInput } from './get-events.input';

@Resolver(() => EventType)
export class EventResolver {
   constructor(
      private eventService: EventService,
      private userService: UserService,
   ) {}

   @Query(() => [EventType])
   @UseGuards(JwtAuthGuard)
   events(
      @User() user: IUser,
      @Args('getEventsInput') { startTime, endTime }: GetEventsInput,
   ) {
      return this.eventService.getEvents(user.userId, startTime, endTime);
   }

   @Mutation(() => EventType)
   @UseGuards(JwtAuthGuard)
   createEvent(
      @Args('createEventInput') createEventInput: CreateEventInput,
      @User() user: IUser,
   ) {
      return this.eventService.createEvent(createEventInput, user.userId);
   }

   @ResolveField()
   async owner(@Parent() event: EventEntity) {
      return this.userService.findById(event.owner);
   }
}
