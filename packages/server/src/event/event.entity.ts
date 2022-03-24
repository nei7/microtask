import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('event')
export class EventEntity {
   @ObjectIdColumn()
   _id: string;

   @Column()
   name: string;

   @Column()
   description: string;

   @Column()
   color: string;

   @Column()
   startTime: number;

   @Column()
   endTime: number;

   @Column()
   owner: string;
}
