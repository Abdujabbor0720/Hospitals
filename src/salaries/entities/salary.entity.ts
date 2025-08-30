import { Bonus } from 'src/bonuses/entities/bonus.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Staff } from 'src/staffs/entities/staff.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';

@Entity('salaries')
export class Salary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'bigint' })
    base_salary: number;

    @Column({ type: 'bigint' })
    total_salary: number;

    @OneToMany(() => Bonus, (bonus) => bonus.salary, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    bonuses: Bonus[];

    @ManyToOne(() => Doctor, (doctor) => doctor.salaries, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'doctor_id' })
    doctor: Doctor;

    @ManyToOne(() => Staff, (staff) => staff.salaries, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'staff_id' })
    staff: Staff;

    @CreateDateColumn()
    created_at: Date;
}
