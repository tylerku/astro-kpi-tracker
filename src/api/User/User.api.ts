import { User } from '@/models';
import IUserAPI from './User.api.interface';
import prisma from '@/prisma/prisma';

export default class UserAPI implements IUserAPI {
  async getUserByAuthProviderId(authProviderId: string): Promise<User | undefined> {
    console.log('getting user by authProviderId', authProviderId)
    const user = await prisma.user.findFirst({
      where: {
        authProviderId: authProviderId
      }
    });
    console.log('getUserByAuthProviderId', user)
    return user ?? undefined;
  }

  async getUserById(id: string): Promise<User | undefined> {
    console.log('getting user by id', id)
    const res = await prisma.user.findFirst({
      where: {
        id: id
      } 
    });
    console.log('getUserById', res)
    return res ?? undefined;
  }

  async createUser(user: User): Promise<User> {
    console.log('creating user...')
    const newUser = await prisma.user.create({
      data: {
        authProviderId: user.authProviderId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
    console.log('user created', newUser.email)
    return newUser;
  }
}