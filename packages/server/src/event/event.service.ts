import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventInput } from './create-event.input';
import { EventEntity } from './event.entity';

@Injectable()
export class EventService {
   constructor(
      @InjectRepository(EventEntity)
      private eventRepository: Repository<EventEntity>,
   ) {}

   async createEvent(createEventInput: CreateEventInput) {
      const event = this.eventRepository.create(createEventInput);
      return this.eventRepository.save(event);
   }

   async getEvents() {
      return this.eventRepository.find({});
   }
}
