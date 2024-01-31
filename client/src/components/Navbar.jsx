
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"; 

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  // console.log("auth:")
  // console.log(auth)
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const logoutUser = () => {
    axiosPrivate
      .post("/api/logout", {}, { withCredentials: true }) // This will "clearCookie" access token and refresh token on back end
      .then((res) => {      
        sessionStorage.removeItem("userName");                                  // This clears sessionStorage
        sessionStorage.removeItem("userId");                                  // This clears sessionStorage
        // setAuth({}) // TEMP <--- I don't think this is necessary
        navigate("/login");
      })
      .catch((err) => console.error("error logging out" + err));
  };

  return (
    <nav className=" border-gray-700 bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
          Pickup Sportz
        </span>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
          </div>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            <li>
              <Link to="/"
                className="block py-2 px-3 text-white rounded md:bg-transparent p-0 hover:text-blue-500 md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link to="/search"
                className="block py-2 px-3 rounded  md:hover:bg-transparent  md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white border-gray-700"
              >
                Events
              </Link>
            </li>
            <li>
              <Link to="/newEvent"
                className="block py-2 px-3  rounded md:hover:bg-transparent md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white border-gray-700"
              >
                Add Event
              </Link>
            </li>
            <li>
              <span
                className="block py-2 px-3 rounded md:hover:bg-transparent md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white border-gray-700 cursor-pointer"
                onClick={logoutUser}
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
