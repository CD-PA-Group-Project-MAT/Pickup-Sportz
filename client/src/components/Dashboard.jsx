import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const [ user, setUser ] = useState({}); // 'user' state holds the current user object

  const userFirstName = sessionStorage.getItem("userName") // User's first name retrieved from SessionStorage. It is placed there at registration or login
  const userId = sessionStorage.getItem("userId") // User's first name retrieved from SessionStorage. It is placed there at registration or login

  /* This function will accept a date in ISO date format (eg:"2024-01-31T18:00:00.000Z" )
    It will return true if the that date is after midnight tonight, otherwise it will return false  */
  function afterToday(eventDate){
    let currentTime = new Date()
    let midnightToday = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate())
    let midnightTonight = new Date(midnightToday.getTime()+24*60*60*1000); 
    return new Date(eventDate) >= midnightTonight;
  }
  
  /* This block returns an the current user's info from the server so that we have all it available to use
   Possibly this would be better handled in setting context or some other way, but we can figure that out later */
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", {withCredentials: true})
      .then(res => {
        console.log("user:")
        console.log(res.data[0])
        setUser(res.data[0])}
      )
      .catch((err) => console.error(err));
  }, []);

  // todo: need to move tables down a bit, should be east enough. Also see if you can round off tables to make them look consistent with rest of UI (Tony you can ignore this comment its just so I remember)

  return (
    <div>
      {<Navbar />}
      {/* table page - need to style so tired */}
      <div className="space-y-4">
        <div>
        {/* Your Events Title */}
        <div className="flex relative justify-center">
          <h1 className="text-xl text-white">Your Events, {userFirstName}</h1>
        </div>
        {/* Todays events table */}
        <div className="flex relative overflow-x-auto shadow-md justify-center sm:rounded-lg">
        <table className="w-1/2 text-sm text-left rtl:text-right  text-gray-400 ">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Event Name</th>
              <th scope="col" class="px-6 py-3">Location</th>
              <th scope="col" class="px-6 py-3">Attendees</th>
              <th scope="col" class="px-6 py-3">Time</th>
            </tr>
          </thead>
          <tbody>
            { user.events ? user.events.filter((event) => new Date(event.eventDate).toDateString() == new Date().toDateString() ).map(event => 
              <tr class="border-b bg-gray-800 border-gray-700 hover:bg-gray-600" key={event._id}>
                <td class="px-6 py-4">
                  <Link to={`/events/${event._id}`}>{event.eventTitle}</Link>
                </td>
                <td class="px-6 py-4">
                  {event.location.locationName}
                </td>
                <td class="px-6 py-4"> 
                  {event.players.length} / {event.maxPlayers}
                </td>
                <td class="px-6 py-4">
                  {new Date(event.eventDate).toLocaleTimeString()}
                </td>
              </tr>
            ):null}
          </tbody>
        </table>
        </div>
        </div>
        
        {/* upcoming events h1 */}
        
        <div>
        <div className="flex relative justify-center">
          <h1 className="text-xl text-white">Upcoming Events</h1>
        </div>
        {/* upcoming events table */}
        <div className="flex relative overflow-x-auto shadow-md justify-center sm:rounded-lg">
        <table className="w-1/2 text-sm text-left rtl:text-right  text-gray-400">
          <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Event Name</th>
              <th scope="col" class="px-6 py-3">Location</th>
              <th scope="col" class="px-6 py-3">Attendees</th>
              <th scope="col" class="px-6 py-3">Time</th>
            </tr>
          </thead>
          <tbody>
          { user.events ? user.events.filter((event) => afterToday(event.eventDate)).map(event => 
              <tr class=" border-b bg-gray-800 border-gray-700 hover:bg-gray-600" key={event._id}>
                <td class="px-6 py-4">
                  <Link to={`/events/${event._id}`}>{event.eventTitle}</Link>
                </td>
                <td class="px-6 py-4">
                  {event.location.locationName}
                </td>
                <td class="px-6 py-4">
                  {event.players.length} / {event.maxPlayers}
                </td>
                <td class="px-6 py-4">
                  {new Date(event.eventDate).toLocaleDateString()} @
                  {new Date(event.eventDate).toLocaleTimeString()}
                </td>
              </tr>
            ):null}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
