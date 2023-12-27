import UserService from './UserService'
import {userAPI} from '@/api/User'

const userService = new UserService(userAPI)
export default userService