import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRole {
    ADMIN = 'admin',
    DOCTOR = 'doctor',
    STAFF = 'staff',
    PATIENT = 'patient'
}

@Entity('auth_users')
export class AuthUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    first_name: string;

    @Column({ type: 'varchar' })
    last_name: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    phone_number: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.PATIENT
    })
    role: UserRole;

    @Column({ type: 'varchar', nullable: true })
    specialization: string;

    @Column({ type: 'varchar', nullable: true })
    license_number: string;

    @Column({ type: 'int', nullable: true })
    experience: number;

    @Column({ type: 'varchar', nullable: true })
    working_hours: string;

    @Column({ type: 'varchar', nullable: true })
    refresh_token: string;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @Column({ type: 'boolean', default: false })
    is_super_admin: boolean;

    @Column({ type: 'int', nullable: true })
    related_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 12);
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
