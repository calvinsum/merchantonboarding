import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OnboardingRecord } from './onboarding-record.entity';

@Entity('sla_breaches')
export class SLABreach {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'onboarding_id' })
  onboardingId: string;

  @Column({
    type: 'enum',
    enum: ['hardware_delivery', 'hardware_installation', 'training'],
  })
  type: string;

  @Column({ name: 'expected_date' })
  expectedDate: Date;

  @Column({ name: 'actual_date', nullable: true })
  actualDate: Date;

  @Column({ name: 'breach_days' })
  breachDays: number;

  @Column({ nullable: true })
  reason: string;

  @Column({ name: 'is_resolved', default: false })
  isResolved: boolean;

  @Column({ name: 'resolved_at', nullable: true })
  resolvedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => OnboardingRecord, (record) => record.slaBreaches)
  @JoinColumn({ name: 'onboarding_id' })
  onboardingRecord: OnboardingRecord;
}
