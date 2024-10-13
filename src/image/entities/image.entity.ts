import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: String;

  @Column()
  url: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
