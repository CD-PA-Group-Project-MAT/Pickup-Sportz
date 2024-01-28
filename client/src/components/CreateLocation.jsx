import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateLocation = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState({
    locationName: "",
    address: "",
    city: "",
    state: "",
    locationDetails: "",
  });

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/locations", location, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/newEvent");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  // useEffect(() => {
  //     axios.get("http://localhost:8000/api/locations")
  //     .then(res => {
  //         setLocation(res.data)
  //     })
  //     .catch(err => console.log(err))
  // }, [])

  return (
    <div className="bg-gray-900 dark:bg-gray-900">
      {/* nav bar */}
      <div>{<Navbar />}</div>
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create a Location
            </h1>
            <form className="space-y-4" onSubmit={submitHandler}>
              {/* Location Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Location Name
                </label>
                <input
                  type="text"
                  name="locationName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Location Name"
                  value={location.locationName}
                  onChange={handleChange}
                />
                {errors.locationName ? (
                  <p>{errors.locationName.message}</p>
                ) : null}
              </div>
              {/* location address */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Address
                </label>
                {/* insert value and handler */}
                <input
                  type="text"
                  name="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1234 Main St."
                  value={location.address}
                  onChange={handleChange}
                />
              </div>
              {/* location city */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  City
                </label>
                {/* insert value and handler */}
                <input
                  type="text"
                  name="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Burbank"
                  value={location.city}
                  onChange={handleChange}
                />
              </div>
              {/* location state */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  State
                </label>
                {/* insert value and handler */}
                <input
                  type="text"
                  name="state"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="California"
                  value={location.state}
                  onChange={handleChange}
                />
              </div>
              {/* location details */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Location Details
                </label>
                {/* insert value and handler */}
                <textarea
                  rows="4"
                  name="locationDetails"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Meet-up spots, Field Number, etc.."
                  value={location.locationDetails}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="py-1">
                  <button
                    type="submit"
                    className="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  >
                    Create Location
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLocation;
