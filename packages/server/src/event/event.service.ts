import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { CreateEventInput } from './create-event.input';
import { EventEntity } from './event.entity';

@Injectable()
export class EventService {
   constructor(
      @InjectRepository(EventEntity)
      private eventRepository: Repository<EventEntity>,
   ) {}

   async createEvent(createEventInput: CreateEventInput, owner: string) {
      const event = this.eventRepository.create({
         ...createEventInput,
         owner,
      });
      return this.eventRepository.save(event);
   }

   findById(_id: string) {
      return this.eventRepository.findOne(_id);
   }

   getEvents(owner: string, startTime?: number, endTime?: number) {
      const condition =
         startTime && endTime
            ? {
                 startTime: {
                    $gt: startTime,
                 },
                 endTime: {
                    $lt: endTime,
                 },
              }
            : {};

      return this.eventRepository.find({
         where: {
            owner,
            ...condition,
         },
      });
   }
}
