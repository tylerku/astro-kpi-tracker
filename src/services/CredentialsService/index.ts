import CredentialsService from "./CredentialsService";
import ICredentialsService from "./CredentialsService.interface";
import credentialsAPI from "@/api/credentials";
import goHighLevelAPI from '@/api/crm/GoHighLevel';

export {
  CredentialsService, 
};

export type {
  ICredentialsService
}
export default new CredentialsService(credentialsAPI, goHighLevelAPI);