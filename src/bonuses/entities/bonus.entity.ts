import { Salary } from 'src/salaries/entities/salary.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bonuses')
export class Bonus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: true })
    bonus_type: string;

    @Column({ type: 'bigint' })
    amount: number;

    @Column({ type: 'text' })
    reason: string;

    @ManyToOne(() => Salary, (salary) => salary.bonuses, {
        onDelete: 'CASCADE',
    })
    salary: Salary;

    @CreateDateColumn()
    created_at: Date;
}
