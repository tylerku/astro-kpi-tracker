// pages/api/auth/callback.ts (Server-side)

import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import cookies from 'cookies';
import moment from 'moment'
import googleAPIService from '../../../services/GoogleAPIService'
import userService from '@/services/UserService';
import { User } from '@/models';


const getUserFromAccessToken = async (accessToken?: string | null): Promise<User> => {
  if (accessToken) {
    const userInfo = await googleAPIService.getUserInfo(accessToken)
    if (!userInfo?.authProviderId) throw new Error('No authProviderId found in userInfo')
    const user = await userService.getUserByAuthProviderId(userInfo.authProviderId)
    if (!user) throw new Error('Failed to get user by authID from database')
    if (user) {
      return user;
    } else {
      const newUserParams: Omit<User, 'id'> = {
        authProviderId: userInfo?.authProviderId ?? '',
        email: userInfo?.email ?? '',
        firstName: userInfo?.firstName ?? '',
        lastName: userInfo?.lastName ?? '',
      }
      const newUser = await userService.createUser(newUserParams)
      if (!newUser) throw new Error('Failed to create new user')
      return newUser;
    }
  } else {
    throw new Error('Cannot get user. Access token is missing');
  }
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const { code } = req.body;
    const tokens = await googleAPIService.getTokensFromAuthCode(code)
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    const expires_in = tokens.expiry_date ? String(tokens.expiry_date) : null;
    googleAPIService.setAuthCredentials({
      access_token: accessToken,
      refresh_token: refreshToken
    })
    const accessTokenExpDate = new Date(tokens.expiry_date ?? 0)
    cookies(req, res).set('accessToken', accessToken, {
      path: '/',
      expires: accessTokenExpDate,
      sameSite: 'strict',
      httpOnly: true,
    });
    cookies(req, res).set('refreshToken', refreshToken, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      sameSite: 'strict',
      httpOnly: true,
    });
    cookies(req, res).set('expires_in', expires_in, {
      path: '/',
      expires: accessTokenExpDate,
      sameSite: 'strict',
      httpOnly: true,
    });
    
    const user = await getUserFromAccessToken(accessToken)
    res.status(200).json({ success: true, user: {...user}});
  } catch (error) {
    console.error('Error during OAuth2 callback:', error);
    res.status(500).json({ error: 'OAuth2 callback failed' });
  }
};
