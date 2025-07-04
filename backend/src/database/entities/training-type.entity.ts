import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TrainingSlot } from './training-slot.entity';

@Entity('training_types')
export class TrainingType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['physical', 'remote', 'video'],
  })
  mode: string;

  @Column({ type: 'integer' })
  duration: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => TrainingSlot, (slot) => slot.trainingType)
  trainingSlots: TrainingSlot[];
}
