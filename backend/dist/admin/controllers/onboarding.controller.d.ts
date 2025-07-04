import { AdminService } from '../admin.service';
export declare class OnboardingController {
    private adminService;
    constructor(adminService: AdminService);
    getAllOnboardingRecords(): Promise<import("../../database/entities").OnboardingRecord[]>;
    getOnboardingById(id: string): Promise<import("../../database/entities").OnboardingRecord>;
    createOnboardingRecord(data: any): Promise<import("../../database/entities").OnboardingRecord>;
    updateOnboardingRecord(id: string, data: any): Promise<import("../../database/entities").OnboardingRecord>;
}
