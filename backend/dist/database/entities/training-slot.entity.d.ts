import { Trainer } from './trainer.entity';
import { TrainingType } from './training-type.entity';
export declare class TrainingSlot {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
    trainerId: string;
    trainingTypeId: string;
    mode: string;
    maxParticipants: number;
    bookedParticipants: number;
    isBooked: boolean;
    onboardingId: string;
    createdAt: Date;
    updatedAt: Date;
    trainer: Trainer;
    trainingType: TrainingType;
}
