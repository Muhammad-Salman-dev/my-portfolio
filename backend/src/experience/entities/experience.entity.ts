import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  role: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  description: string; 
}