import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import toISODateString from "../utils/toISOdateString";

// TODO: required - add validation error messages in appropriate places in form

const Register = () => {

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const defaultBirthday = toISODateString(new Date())
  const [user, setUser] = useState({
      firstName:'',
      lastName:'',
      email:'',
      birthday: defaultBirthday,
      password:'',
      confirmPassword:'',
      checkedMessagesDate: new Date()
  });

  const handleChange = (e) => {
      setUser({...user, [e.target.name]:e.target.value})
  }

  const handleRegister = (e) => {
    e.preventDefault();
      // TODO: eventually - first thing upon attempt to register would be to 'logout' if there is a cookie and sessionStorage
      axios.post("http://localhost:8000/api/register", user, {withCredentials:true})
      .then((res) => {
        sessionStorage.setItem('userName', res.data.user.firstName)
        navigate("/dashboard");
      })
      .catch(err => {
        setErrors(err.response.data.errors)
      })
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Register for your Pickup Sportz account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
            <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input  name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required="" value={user.firstName} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input  name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required="" value={user.lastName} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required="" value={user.email} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your birthday</label>
                <input type="date" name="birthday" id="birthday" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@birthday.com" required="" value={user.birthday} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={user.password} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={user.confirmPassword} onChange={handleChange}/>
            </div>
            <button type="submit" className="w-full text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up!</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
            </p>
        </form>
    </div>
</div>
</div>
</section>
  )
}

export default Register