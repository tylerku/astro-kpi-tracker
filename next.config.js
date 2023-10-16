/** @type {import('next').NextConfig} */

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'cookie',
            key: 'accessToken',
            value: '.*'
          }
        ],
        destination: '/home',
        permanent: true,
      },
      {
        source: '/',
        has: [
          {
            type: 'cookie',
            key: 'refreshToken',
            value: '.*'
          }
        ],
        destination: '/auth/refresh',
        permanent: true
      }
    ]
  }
}
