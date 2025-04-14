import { User } from '@/models';
import { IDatabase, supabaseDB } from '@/database';
import IUserAPI from './User.api.interface';
import prisma from '@/prisma/prisma';

export default class UserAPI implements IUserAPI {
  async getUserByAuthProviderId(authProviderId: string): Promise<User | undefined> {
    const user = await prisma.user.findFirst({
      where: {
        authProviderId: authProviderId
      }
    });
    return user ?? undefined;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return await prisma.user.findFirst({
      where: {
        id: id
      } 
    }) ?? undefined;
  }

  async createUser(user: User): Promise<User> {
    return await prisma.user.create({
      data: {
        authProviderId: user.authProviderId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
  }
}