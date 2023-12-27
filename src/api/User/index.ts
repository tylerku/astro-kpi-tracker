import UserAPI from './User.api'
import IUserAPI from './User.api.interface'
export type { IUserAPI }

const userAPI = new UserAPI()
export { userAPI }