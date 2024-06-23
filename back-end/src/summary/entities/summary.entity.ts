import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Summary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: 0 })
    total: number;

    @Column({ default: 0.0, type: 'decimal', precision: 3, scale:2 })
    percentage: number;
}
