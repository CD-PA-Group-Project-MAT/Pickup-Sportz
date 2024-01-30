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
  
  /* 
  This next useEffect block returns the current user's info from the server so that we have all it available to use.
  Pulling from 'useAuth' night not work (or would be more complicated) because the array of events needs to be updated every 
  time we render this component
   */
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", {withCredentials: true})
      .then(res => {
        setUser(res.data[0])}
      )
      .catch((err) => console.error(err));
  }, []);

  // todo: need to move tables down a bit, should be easy enough. Also see if you can round off tables to make them look consistent with rest of UI (Tony you can ignore this comment its just so I remember)

  return (
    <div>
      {<Navbar />}
      <div className="space-y-4">
        <div>
        {/* Your Events Title */}
        <div className="flex relative justify-center">
          <h1 className="text-xl text-white">Get your game on today, {userFirstName}:</h1>
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
            { user.events && user.events.filter((event) => new Date(event.eventDate).toDateString() == new Date().toDateString() ).length > 0 
            ? 
            user.events.filter((event) => new Date(event.eventDate).toDateString() == new Date().toDateString() ).sort((a,b) => new Date(a.eventDate) > new Date(b.eventDate) ? 1 : -1 ).map(event => 
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
                  {new Date(event.eventDate).toLocaleTimeString([],{ timeStyle: 'short'})}
                </td>
              </tr>)
              :
              <tr>
                <td colspan="4" className="text-center py-4"> 
                  Nothing on the schedule for today. Check <Link to={"/search"} className=" md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white">events</Link> for the full schedule!
                </td>
              </tr>
            }
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
          { user.events && user.events.filter((event) => afterToday(event.eventDate)).length > 0 
            ? 
            user.events.filter((event) => afterToday(event.eventDate)).sort((a,b) => new Date(a.eventDate) > new Date(b.eventDate) ? 1 : -1 ).map(event => 
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
                  {new Date(event.eventDate).toLocaleDateString() + " - "}
                  {new Date(event.eventDate).toLocaleTimeString([], {timeStyle: 'short'})}
                </td>
              </tr>
            )
            :
            <tr>
              <td colspan="4" className="text-center py-4"> 
                No future events. Check <Link to={"/search"} className=" md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white">events</Link> for the full schedule!
              </td>
            </tr>
          }
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
