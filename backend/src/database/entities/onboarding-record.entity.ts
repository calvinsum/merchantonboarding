import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Merchant } from './merchant.entity';
import { SLABreach } from './sla-breach.entity';

@Entity('onboarding_records')
export class OnboardingRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'merchant_id' })
  merchantId: string;

  @Column({
    type: 'text',
    array: true,
    name: 'onboarding_types',
  })
  types: string[];

  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Column({ type: 'jsonb' })
  progress: {
    hardwareDelivery: {
      status: string;
      scheduledDate?: Date;
      completedDate?: Date;
      slaDate: Date;
      notes?: string;
    };
    hardwareInstallation: {
      status: string;
      scheduledDate?: Date;
      completedDate?: Date;
      slaDate: Date;
      notes?: string;
    };
    training: {
      status: string;
      scheduledDate?: Date;
      completedDate?: Date;
      slaDate: Date;
      notes?: string;
    };
  };

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'assigned_to', nullable: true })
  assignedTo: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Merchant, (merchant) => merchant.onboardingRecords)
  @JoinColumn({ name: 'merchant_id' })
  merchant: Merchant;

  @OneToMany(() => SLABreach, (breach) => breach.onboardingRecord)
  slaBreaches: SLABreach[];
}
