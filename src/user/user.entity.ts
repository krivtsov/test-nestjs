import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
@Unique(['user_id'])
export class UserEntity {
  @ApiProperty({ example: 1, description: 'id in base' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'email@mail.ru', description: 'Email or Phone' })
  @Column()
  user_id: string;

  @ApiProperty({ example: 'strongPass123', description: 'user password' })
  @Column()
  password: string;

  @BeforeInsert()
  async hashPAssword() {
    this.password = await hash(this.password, 10);
  }

  @ApiProperty({ example: 'email', description: 'type user_id email or phone' })
  @Column({ default: '' })
  type: string;
}
