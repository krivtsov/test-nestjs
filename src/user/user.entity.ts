import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity('user')
@Unique(['user_id'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPAssword() {
    this.password = await hash(this.password, 10);
  }

  @Column({ default: '' })
  type: string;
}
