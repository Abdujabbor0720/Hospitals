import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    first_name: string;

    @Column({ type: 'varchar' })
    last_name: string;

    @Column({ type: 'date' })
    birth_date: Date;

    @Column({ type: 'varchar' })
    gender: string;

    @Column({ type: 'varchar' })
    passport_info: string;

    @Column({ type: 'int' })
    age: number;

    @Column({ type: 'varchar' })
    phone_number: string;

    @Column({ type: 'text' })
    address: string;

    @OneToMany(() => Appointment, (appointment) => appointment.patient, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    appointments: Appointment[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
