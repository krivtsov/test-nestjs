import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';

@Entity('user')
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
}
