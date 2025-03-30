import ICRMService from "./CRMService.interface";
import GoHighLevelService from "./GoHighLevelService.ts";

const CRMService: ICRMService = new GoHighLevelService();
export default CRMService;