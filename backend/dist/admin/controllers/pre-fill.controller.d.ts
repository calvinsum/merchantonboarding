import { AdminService } from '../admin.service';
import { PreFillFormDto } from '../dto/pre-fill-form.dto';
import { MerchantLinkResponseDto } from '../dto/merchant-link-response.dto';
export declare class PreFillController {
    private adminService;
    constructor(adminService: AdminService);
    getPreFillInfo(): Promise<{
        service: string;
        version: string;
        description: string;
        endpoints: {
            createMerchant: string;
            generateLink: string;
            verifyToken: string;
        };
        status: string;
    }>;
    createMerchantFromPreFill(preFillData: PreFillFormDto): Promise<MerchantLinkResponseDto>;
    generateMerchantLink(merchantId: string): Promise<MerchantLinkResponseDto>;
    verifyMerchantToken(token: string): Promise<{
        valid: boolean;
        merchantId?: string;
    }>;
}
