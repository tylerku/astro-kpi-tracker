import { parse } from "cookie"
import { GetServerSidePropsContext } from "next"

export const isAccessTokenExpired = (expires_in: string) => {
  const expires_in_number = Number(expires_in)
  const tokenIsExpired = expires_in_number && expires_in_number < Date.now() 
  return tokenIsExpired
}

export const isAccessTokenValid = (accessToken: string, expires_in: string) => {
  if (accessToken && !isAccessTokenExpired(expires_in)) {
    return true
  } 
  return false
}

export const getServerSideAuthorization = (context: GetServerSidePropsContext) => {
  const cookies = parse(context.req.headers.cookie ?? '')
  const refreshToken = cookies['refreshToken']
  const accessToken = cookies['accessToken']
  const expiresIn = cookies['expires_in']

  if (!isAccessTokenValid(accessToken, expiresIn) && refreshToken) {
    return {
      redirect: {
        destination: '/auth/refresh',
        permanent: false,
      }
    }
  }

  if (!isAccessTokenValid(accessToken, expiresIn) && !refreshToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return undefined
}
