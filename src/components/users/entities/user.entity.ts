import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Books as Book } from 'src/components/books/entities/book.entity';
@Entity()
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'datetime', default: null })
  created_at?: Date;

  @Column({ type: 'datetime', default: null })
  updated_at?: Date;

  @OneToMany(() => Book, (book) => book.user)
  books?: Book[];
}
