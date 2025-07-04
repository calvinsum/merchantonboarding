import { TrainingSlot } from './training-slot.entity';
export declare class TrainingType {
    id: string;
    name: string;
    mode: string;
    duration: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    trainingSlots: TrainingSlot[];
}
