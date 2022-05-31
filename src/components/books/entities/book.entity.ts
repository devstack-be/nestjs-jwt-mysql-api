import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users as User } from 'src/components/users/entities/user.entity';
@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column()
  author: string;

  @Column({ type: 'datetime', default: null })
  created_at?: Date;

  @Column({ type: 'datetime', default: null })
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
