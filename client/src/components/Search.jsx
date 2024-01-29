import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import axios from 'axios'
import SearchForm from "./SearchForm"

function Search() {

  const [eventsList,setEventsList] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const userId = sessionStorage.getItem("userId") // User's first name retrieved from SessionStorage. It is placed there at registration or login

  // This function to determines whether or not current user is already a player in a given event
  function userIsPlayer(event){
    for (let i = 0; i < event.players.length; i++){
      if (event.players[i]._id === userId) return true;
    }
    return false;
  }

    // This block populates an array of the entire database of List and sets 'events' state
  useEffect(() => {
    axios.get("http://localhost:8000/api/events", {withCredentials: true})
    .then(res => {
      console.log("events")
      console.log(res.data);
      setEventsList(res.data);
      // TODO: By default filter res.data to today or later
      setFilteredEvents(res.data);
    })
    .catch(err => console.error(err))
  },[])

  // Handle click on "join" link
  function joinHandler(eventId){
    console.log("clicked join")
    axios.patch(`http://localhost:8000/api/events/join/${eventId}/player/${userId}`,{} ,{withCredentials : true})
    .then(res => {
      // update events
      // update filtered events
      
    })
    .catch(err=> console.error(err))
  }
  // Handle click on "Drop" link
  function dropHandler(eventId){
    console.log("clicked drop")
    axios.patch(`http://localhost:8000/api/events/drop/${eventId}/player/${userId}`,{} ,{withCredentials : true})
    .then(res => {
      // update events
      // update filtered events
    })
    .catch(err=> console.error(err))
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-700 max-xl:bg-gray-50">
      <Navbar/>
      <SearchForm eventsList={eventsList} setFilteredEvents={setFilteredEvents}/>
      <div className="flex relative overflow-x-auto shadow-md justify-center sm:rounded-lg">
      <table className="w-1/2 text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Event Name</th>
              <th scope="col" class="px-6 py-3">Location</th>
              <th scope="col" class="px-6 py-3">Attendees</th>
              <th scope="col" class="px-6 py-3">Date</th>
              <th scope="col" class="px-6 py-3">Creator</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
          { filteredEvents ? filteredEvents.map(event => 
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={event._id}>
                <td class="px-6 py-4">
                  {event.eventTitle}
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
                <td class="px-6 py-4">
                  {event.creator.firstName} 
                  {event.creator.lastName} 
                </td>
                <td class="px-6 py-4">
                  { userIsPlayer(event) ? 
                    <span className="text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={() => dropHandler(event._id)}>Drop</span>
                     :
                     event.players.length >= event.maxPlayers ? "Full" 
                     : 
                     <span className="text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={() => joinHandler(event._id)}>Join</span> } 
                </td>
              </tr>
            ):null}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default Search