import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
   createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
      return this.eventService.createEvent(createEventInput);
   }
}
