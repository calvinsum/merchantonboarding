import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TrainingSlot } from './training-slot.entity';

@Entity('trainers')
export class Trainer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({
    type: 'text',
    array: true,
  })
  languages: string[];

  @Column({
    type: 'text',
    array: true,
  })
  locations: string[];

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'busy'],
    default: 'active',
  })
  status: string;

  @Column({ name: 'assignment_count', default: 0 })
  assignmentCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => TrainingSlot, (slot) => slot.trainer)
  trainingSlots: TrainingSlot[];
}
