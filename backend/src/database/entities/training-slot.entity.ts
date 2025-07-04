import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Trainer } from './trainer.entity';
import { TrainingType } from './training-type.entity';

@Entity('training_slots')
export class TrainingSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ name: 'start_time' })
  startTime: string;

  @Column({ name: 'end_time' })
  endTime: string;

  @Column({ name: 'trainer_id' })
  trainerId: string;

  @Column({ name: 'training_type_id' })
  trainingTypeId: string;

  @Column({
    type: 'enum',
    enum: ['physical', 'remote', 'video'],
  })
  mode: string;

  @Column({ name: 'max_participants', default: 1 })
  maxParticipants: number;

  @Column({ name: 'booked_participants', default: 0 })
  bookedParticipants: number;

  @Column({ name: 'is_booked', default: false })
  isBooked: boolean;

  @Column({ name: 'onboarding_id', nullable: true })
  onboardingId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Trainer, (trainer) => trainer.trainingSlots)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;

  @ManyToOne(() => TrainingType, (type) => type.trainingSlots)
  @JoinColumn({ name: 'training_type_id' })
  trainingType: TrainingType;
}
