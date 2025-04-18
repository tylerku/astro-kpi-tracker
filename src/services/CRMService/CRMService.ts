import { IOAuth2API } from "@/api/OAuth2.interface";
import ICRMService from "./CRMService.interface";
import goHighLevelService from "./GoHighLevelService.ts";

const crmService: ICRMService & IOAuth2API = goHighLevelService; 
export default crmService;