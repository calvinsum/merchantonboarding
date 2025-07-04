import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { OnboardingRecord } from './onboarding-record.entity';

@Entity('merchants')
export class Merchant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'account_name' })
  accountName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ name: 'pic_name' })
  picName: string;

  @Column({
    type: 'enum',
    enum: ['food_beverage', 'retail', 'services', 'healthcare', 'beauty', 'education', 'other'],
  })
  segment: string;

  @Column({ type: 'jsonb', name: 'delivery_address', nullable: true })
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  @Column({ type: 'jsonb', name: 'training_address', nullable: true })
  trainingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  @Column({
    type: 'enum',
    enum: ['en', 'ms', 'zh', 'ta'],
    name: 'preferred_language',
    default: 'en',
  })
  preferredLanguage: string;

  @Column({ type: 'date', name: 'expected_go_live_date', nullable: true })
  expectedGoLiveDate: Date;

  // Phase 1a: Authentication fields
  @Column({ name: 'auth_token', nullable: true })
  authToken: string;

  @Column({ name: 'auth_token_expiry', nullable: true })
  authTokenExpiry: Date;

  @Column({ 
    type: 'enum',
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  })
  status: string;

  @Column({ name: 'business_location', nullable: true })
  businessLocation: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => OnboardingRecord, (record) => record.merchant)
  onboardingRecords: OnboardingRecord[];
}
