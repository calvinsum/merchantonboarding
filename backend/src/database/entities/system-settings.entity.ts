import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('system_settings')
export class SystemSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string;

  @Column()
  value: string;

  @Column({
    type: 'enum',
    enum: ['string', 'number', 'boolean', 'json'],
    default: 'string',
  })
  type: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({ name: 'is_editable', default: true })
  isEditable: boolean;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
