import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    scheduled_at: Date;

    @Column({ type: 'text' })
    notes: string;

    @ManyToOne(() => Patient, (patient) => patient.appointments, {
        onDelete: 'CASCADE',
    })
    patient: Patient;

    @ManyToOne(() => Doctor, {
        onDelete: 'CASCADE',
    })
    doctor: Doctor;

    @CreateDateColumn()
    created_at: Date;
}
