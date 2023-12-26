import UserService from './UserService'
import {supabaseUserAPI} from '@/api/User'

const userService = new UserService(supabaseUserAPI)
export default userService