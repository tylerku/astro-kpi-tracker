// pages/auth/callback.tsx (Client-side)

import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import { googleConfig } from '../../../googleConfig';

const CallbackPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;

    if (code) {
      // Call your server-side API endpoint to exchange the authorization code for an access token
      console.log('this is running!!!')
      fetch('/api/auth/callback', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server-side callback
          console.log('accessToken:', data.accessToken)
          localStorage.setItem('accessToken', data.accessToken); 
          // e.g., store the access token in localStorage, navigate to a new page, etc.
        })
        .catch((error) => {
          console.error('Error during OAuth2 callback:', error);
          // Handle the error case
        });
    }
  }, [router.query]);

  return null;
};

export default CallbackPage;
