import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  originalname: string;

  @Column()
  url: string;

  @Column()
  description: string;

  @Column({ name: 'createdAt' })
  createdAt: Date;

  @Column({ name: 'updatedAt' })
  updatedAt: Date;
}
