import UserService from './UserService'
import {userAPI} from '@/api/User'
import credentialsAPI from '@/api/credentials'

const userService = new UserService(userAPI, credentialsAPI);
export default userService;