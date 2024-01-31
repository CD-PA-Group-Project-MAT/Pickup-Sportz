import axios from '../api/axios';
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/api/refresh", {withCredentials: true})
    console.log("Access token expired, refreshing...")
    setAuth(prev => { 
      return { ...prev, user: response.data.user}
    })
    return response.data.accessToken;
  }
  return refresh;
}
export default useRefreshToken;