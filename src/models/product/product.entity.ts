import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  brand: string;

  @Column()
  description: string;
}
