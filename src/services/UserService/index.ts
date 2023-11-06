import UserService from './UserService'
import {postgresUserAPI} from '@/api/User'

const userService = new UserService(postgresUserAPI)
export default userService