import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toISODateString from "../utils/toISOdateString";

// I think I've been staring at this for too long. Need to figure out a way to pass date into state. I am not sure if an empty string is the right move. Also having trouble passing in user into the form. Maybe a hidden input field? I left a note down by location with the form. Not sure how to add value in there. Mapping all of the locations into the select field properly though.

// TODO: Add a cancel button
// TODO: color for error messages

const CreateEvent = () => {
  const userId = sessionStorage.getItem("userId"); // User's first name retrieved from SessionStorage. It is placed there at registration or login
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [locations, setLocations] = useState([]);
  const [datePicker, setDatePicker] = useState(toISODateString(new Date()));  // Set default date to today. HTML date form is formatted as "YYYY-MM-DD"
  const [timePicker, setTimePicker] = useState("12:00");                      // Set default time to noon. HTML time form is formatted "18:00" for 6:00pm

  /* This is a little helper function that takes the date string and time string and combines
      them into a JS date object. Notice that month is 0 indexed so we subtract 1 for the month.
   */ 
  function dateObjectMaker(ISOdateString, timeString) {
    const dateParts = ISOdateString.split("-");
    const timeParts = timeString.split(":");
    return new Date(dateParts[0], dateParts[1]-1, dateParts[2],timeParts[0],timeParts[1]);
  }

  const [event, setEvent] = useState({
    eventTitle: "",
    eventDate: dateObjectMaker(toISODateString(new Date()), "12:00"),
    eventDetails: "",
    maxPlayers: 0,
    location: null,
    creator: userId
  });

  // pulling locations from database
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/locations", {withCredentials:true})
      .then((res) => {
        if(res.data.length > 0){                                        // In case there are no locations in DB
          setEvent({...event, location : res.data[0]._id})              // The idea is that the location is prefilled with the first _id in the location collection
        }
        setLocations(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  /* Handle change in all form fields here */
  function handleChange(e) {
    if (e.target.name === "datePicker"){                                // Special handling of change in 'datePicker'
      setDatePicker(e.target.value);
      const combinedDateObject = dateObjectMaker(e.target.value, timePicker)
      setEvent({...event, eventDate : combinedDateObject})
    } else if (e.target.name == "timePicker") {                         // Special handling of change in 'timePicker'
      setTimePicker(e.target.value);
      const combinedDateObject = dateObjectMaker(datePicker,e.target.value)
      setEvent({...event, eventDate : combinedDateObject})
    } else {                                                            // General handling for change in all other form fields
      setEvent({...event, [e.target.name] : e.target.value})
    }
  }

  /* Handle form submission here */
  function handleSubmit(e){
    e.preventDefault();
    axios.post("http://localhost:8000/api/events", event, {withCredentials:true})
    .then(res => {
      console.log(res)
      navigate('/dashboard')
    })
    .catch(err => {
      console.error(err.response.data.errors);
      setErrors(err.response.data.errors)
    })
  }
  return (
    <div className="bg-gray-900 dark:bg-gray-900">
      {/* nav bar */}
      <div>{<Navbar />}</div>
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an Event
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* title */}
              <div>
                <label
                  htmlFor="eventTitle"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Event Title
                </label>
                <input
                  type="text"
                  name="eventTitle"
                  id="eventTitle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Event Title"
                  required="" value={event.eventTitle} onChange={handleChange}
                />
                {errors.eventTitle ? (
                  <p>{errors.eventTitle.message}</p>
                ) : null}
              </div>
              {/* event date */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Event Date
                </label>
                <input
                  type="date"
                  name="datePicker"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={datePicker} onChange={handleChange}
                />
              </div>
              {/* event time */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Event Date
                </label>
                <input
                  type="time"
                  name="timePicker"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={timePicker} onChange={handleChange}
                />
              </div>
              {/* event details */}
              <div>
                <label
                  htmlFor="eventDetails"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Event Details
                </label>
                <textarea
                  name="eventDetails"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write the details of the event here..." value={event.eventDetails} onChange={handleChange}
                ></textarea>
              </div>
              {/* maxPlayers */}
              <div>
                <label
                  htmlFor="maxPlayers"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Maximum Participants
                </label>
                <input
                  type="number"
                  name="maxPlayers"
                  id="maxPlayers"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Maximum Participants"
                  required="" value={event.maxPlayers} onChange={handleChange}
                />
                {errors.maxPlayers ? (
                  <p>{errors.maxPlayers.message}</p>
                ) : null}
              </div>
              {/* event location */}
              {/* having trouble with getting that event value squared away for location. Mapped into the select fine. */}
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
                <select name="location"
                  className="bg-gray-50 border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  onChange={handleChange}
                >
                  {locations.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.locationName}
                    </option>
                  ))}
                </select>
                {errors.location ? (
                  <p>{errors.location.message}</p>
                ) : null}
              </div>
              {/* submit form (button)*/}
              <div className="py-1">
                <button
                  type="submit"
                  className="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:text-white"
                >
                  Create Event
                </button>
              </div>
            </form>
            {/* link to location form */}
            <div>
              <Link to="/newlocation" className="text-white">
                Can't find your location?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
