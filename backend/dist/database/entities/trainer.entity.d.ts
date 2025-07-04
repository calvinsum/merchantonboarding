import { TrainingSlot } from './training-slot.entity';
export declare class Trainer {
    id: string;
    name: string;
    email: string;
    phone: string;
    languages: string[];
    locations: string[];
    status: string;
    assignmentCount: number;
    createdAt: Date;
    updatedAt: Date;
    trainingSlots: TrainingSlot[];
}
