import { ReportsService } from './reports.service';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    getOnboardingFunnel(): Promise<any>;
    getSLAPerformance(): Promise<any>;
    getTrainerUtilization(): Promise<any[]>;
    getSegmentPerformance(): Promise<any[]>;
}
