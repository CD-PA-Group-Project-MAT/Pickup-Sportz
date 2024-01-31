import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

// TODO write up a more complete explanation of what is going on here

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false) // This line is where the 'return' below switches back to <Outlet/> after refreshing access token
      }
    }
    // Upon browser refresh, or navigating away an coming back, 'auth' context will be emptied
    // So, when that happens, we run the verifyRefreshToken function above.
    // Otherwise, we set 'isLoading' to false
    !auth?.user ? verifyRefreshToken() : setIsLoading(false)
  }, [])

  return (
    <>
    {isLoading
      ? <p>Loading...</p>
      : <Outlet/>
    }
    </>
  )
}

export default PersistLogin;