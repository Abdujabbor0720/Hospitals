import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    first_name: string;

    @Column({ type: 'varchar' })
    last_name: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'bigint' })
    hashed_password: number;

    @Column({ type: 'varchar' })
    phone_number: string;

    @Column({ type: 'enum', enum: ['admin', 'super_admin'] })
    role: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
