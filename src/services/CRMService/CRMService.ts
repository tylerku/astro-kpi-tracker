import { IOAuth2API } from "@/api/OAuth2.interface";
import ICRMService from "./CRMService.interface";
import GoHighLevelService from "./GoHighLevelService.ts";

const CRMService: ICRMService & IOAuth2API = new GoHighLevelService();
export default CRMService;