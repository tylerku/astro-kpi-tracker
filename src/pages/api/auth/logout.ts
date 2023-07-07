import { NextApiRequest, NextApiResponse } from 'next';
import cookies from 'cookies'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    // res.setHeader('Set-Cookie', `${cookies} path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    // res.setHeader('Set-Cookie', 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    cookies(req, res).set('accessToken', '', {
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
    })
    cookies(req, res).set('refreshToken', '', {
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
    })

    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error removing auth cookies while logging out:', error);
    res.status(500).json({ error: 'Loggout failed' });
  }
};
