import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
   @ObjectIdColumn()
   _id: string;

   @Column({ unique: true })
   username: string;

   @Column()
   email: string;

   @Exclude()
   @Column()
   password: string;
}
