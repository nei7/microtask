import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateEventInput } from './create-event.input';
import { EventService } from './event.service';
import { EventType } from './event.type';

@Resolver(() => EventType)
export class EventResolver {
   constructor(private eventService: EventService) {}

   @Query(() => [EventType])
   getEvents() {
      return this.eventService.getEvents();
   }

   @Mutation(() => EventType)
   @UseGuards(JwtAuthGuard)
   createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
      return this.eventService.createEvent(createEventInput);
   }
}
