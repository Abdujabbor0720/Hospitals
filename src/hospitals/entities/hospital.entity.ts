import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';
import { Department } from 'src/departments/entities/department.entity';

@Entity('hospitals')
export class Hospital {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    phone_number: string;

    @OneToOne(() => Location, { onDelete: 'SET NULL' })
    @JoinColumn()
    location: Location;

    @ManyToOne(() => Department, { onDelete: 'SET NULL' })
    department: Department;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'int' })
    established_year: number;

    @CreateDateColumn()
    created_at: Date;
}
