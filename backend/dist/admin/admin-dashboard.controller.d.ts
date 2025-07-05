import { Response } from 'express';
export declare class AdminDashboardController {
    serveAdminDashboard(res: Response): Promise<void>;
    redirectToRoot(res: Response): Promise<void>;
}
