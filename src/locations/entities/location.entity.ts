import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Hospital } from 'src/hospitals/entities/hospital.entity';

@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    address: string;

    @Column({ type: 'varchar' })
    country: string;

    @Column({ type: 'varchar' })
    city: string;

    @Column({ type: 'varchar' })
    region: string;

    @OneToOne(() => Hospital, (hospital) => hospital.location)
    hospital: Hospital;
}
