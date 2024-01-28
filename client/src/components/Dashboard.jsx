import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Dashboard = () => {
  const [ user, setUser ] = useState({}); // 'user' state holds the current user object
  // const [ events, setEvents ] = useState([]); // 'events' state holds an array of ALL events in the DB
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

  // This block populates an array of the entire database of events and sets 'events' state
  // We actually won't use this on this page because events on this page will be coming from the 'user'
  // but we will use it on the search' page
  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/events", {withCredentials: true})
  //   .then(res => {
  //     console.log("events")
  //     console.log(res.data);
  //     setEvents(res.data);
  //   })
  //   .catch(err => console.error(err))
  // },[])

  return (
    <div>
      {<Navbar />}
      {/* table page - need to style so tired */}
      <div>
        {/* Your Events Title */}
        <div>
          <h1>Your Events, {userFirstName}</h1>
        </div>
        {/* Todays events table */}
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Location</th>
              <th>Attendees</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            { user.events ? user.events.filter((event) => new Date(event.eventDate).toDateString() == new Date().toDateString() ).map(event => 
              <tr key={event._id}>
                <td>
                  {event.eventTitle}
                </td>
                <td>
                  {event.location.locationName}
                </td>
                <td>
                  {event.players.length} / {event.maxPlayers}
                </td>
                <td>
                  {new Date(event.eventDate).toLocaleTimeString()}
                </td>
              </tr>
            ):null}
          </tbody>
        </table>

        {/* upcoming events h1 */}
        <div>
          <h1>Upcoming Events</h1>
        </div>
        {/* upcoming events table */}
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Location</th>
              <th>Attendees</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
          { user.events ? user.events.filter((event) => afterToday(event.eventDate)).map(event => 
              <tr key={event._id}>
                <td>
                  {event.eventTitle}
                </td>
                <td>
                  {event.location.locationName}
                </td>
                <td>
                  {event.players.length} / {event.maxPlayers}
                </td>
                <td>
                  {new Date(event.eventDate).toLocaleDateString()} @
                  {new Date(event.eventDate).toLocaleTimeString()}
                </td>
              </tr>
            ):null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
