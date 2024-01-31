import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // So here we are defining where we will 'navigate to' after a successful login. If the user was redirected here from 'RequireAuth' there should be a path saved in state that we can use. Otherwise, we navigate to '/' (which is the dashboard)
  const [errorMessage, setErrorMessage] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) =>  {
      e.preventDefault();
      // TODO: eventually - maybe first thing upon attempt to login would be to 'logout' if there is a cookie and sessionStorage
      axios.post("/api/login", { email, password}, { withCredentials : true }) 
      .then((res) => {
        setAuth( {user: res.data.user})
        sessionStorage.setItem('userName', res.data.user.firstName)
        sessionStorage.setItem('userId', res.data.user._id)
        navigate(from, { replace: true }); // The idea here is that are we go to the location requested but cut off by the RequireAuth.jsx page before user was redirected to Login
      } )
      .catch(err => {
        setErrorMessage(err.response.data.message)
      })
  }

  return (
    <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-gray-800 rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                    Sign in to your Pickup Sportz account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={loginHandler}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white ">Your email</label>
                        <input type="email" name="email" id="email" className=" border   sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@email.com" required="" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white" >Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {errorMessage ? <p>{errorMessage}</p> : null}
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800">Sign in</button>
                    <p className="text-sm font-light text-gray-400">
                        Don’t have an account yet? <Link to="/register" className="font-medium text-primary-500 hover:underline ">Sign up</Link>
                    </p>
                </form>
            </div>
    </div>
</div>
</section>
  )
}

export default Login