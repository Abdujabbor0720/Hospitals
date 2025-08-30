import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Salary } from 'src/salaries/entities/salary.entity';
import { Column, CreateDateColumn, Entity, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('doctors')
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    first_name: string;

    @Column({ type: 'varchar' })
    last_name: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    phone_number: string;

    @Column({ type: 'varchar' })
    specialization: string;

    @Column({ type: 'varchar' })
    phone_number_2: string;

    @Column({ type: 'varchar' })
    license_number: string;

    @Column({ type: 'int' })
    experience: number;

    @Column({ type: 'varchar' })
    working_hours: string;

    @OneToMany(() => Salary, (salary) => salary.doctor, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    salaries: Salary[];

    @OneToMany(() => Appointment, (appointment) => appointment.doctor, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    appointments: Appointment[];

    @ManyToMany(() => Department)
    @JoinTable({
        name: 'doctor_departments',
        joinColumn: { name: 'doctor_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'department_id', referencedColumnName: 'id' }
    })
    departments: Department[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
