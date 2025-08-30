import { Salary } from 'src/salaries/entities/salary.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('staffs')
export class Staff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    first_name: string;

    @Column({ type: 'varchar' })
    last_name: string;

    @Column({ type: 'int' })
    age: number;

    @Column({ type: 'varchar' })
    staff_code: string;

    @Column({ type: 'varchar' })
    employment_type: string;

    @Column({ type: 'boolean' })
    is_active: boolean;

    @Column({ type: 'varchar' })
    phone_number: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'date' })
    hire_date: Date;

    @OneToMany(() => Salary, (salary) => salary.staff, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    salaries: Salary[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
