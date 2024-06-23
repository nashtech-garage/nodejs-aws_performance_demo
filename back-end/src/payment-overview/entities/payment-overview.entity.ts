import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { payment_type } from '../enum/payment.enum';
import { ApiQuery } from '@nestjs/swagger';
import { Query } from '@nestjs/common';

@Entity()
export class PaymentOverview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    month: number;

    @Column()
    year: number;

    @Column({
        type: 'decimal',
        precision: 8,
        scale: 2
    })
    value: number;

    @Column({
        type: 'enum',
        enum: payment_type,
        default: payment_type.Due,
    })
    payment_type: payment_type;

    @ApiQuery({ name: 'type', enum: payment_type })
    async filterByPaymentType(@Query('type') type: payment_type = payment_type.Due ) {}
}
