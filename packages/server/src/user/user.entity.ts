import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
   @ObjectIdColumn()
   _id: ObjectID;

   @Column({ unique: true })
   username: string;

   @Column()
   email: string;

   @Column()
   password: string;
}
