import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import axios from 'axios'
import SearchForm from "./SearchForm"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function Search() {
  const { auth } = useAuth();
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
      setEventsList(res.data);
      const sortedEvents = res.data.sort((a,b) => new Date(a.eventDate) > new Date(b.eventDate) ? 1 : -1 )
      setFilteredEvents(sortedEvents);
    })
    .catch(err => console.error(err))
  },[])

  /* Here's where we handle a click on a 'join' link */
  function joinHandler(eventId){
    axios.patch(`http://localhost:8000/api/events/join/${eventId}/player/${userId}`,{} ,{withCredentials : true})
    .then(res => {
      // I feel like there has to be a more elegant way to do the following
      // But I'm running out of energy 
      let tempEventsList = [...eventsList]
      for ( let i=0; i < tempEventsList.length; i++){
        if (tempEventsList[i]._id === eventId){
          tempEventsList[i].players.push(auth.user)
        }
      }
      setEventsList(tempEventsList)
      let tempFilterEvents = [...filteredEvents]
      for ( let i=0; i < tempFilterEvents.length; i++){
        if (tempFilterEvents[i]._id === eventId){
          tempFilterEvents[i].players.push(auth.user)
        }
      }
      setFilteredEvents(tempFilterEvents)
    })
    .catch(err=> console.error(err))
  }

  /* Here's where we handle a click on a 'drop' link */
  function handleDrop(eventId){
    axios.patch(`http://localhost:8000/api/events/drop/${eventId}/player/${userId}`,{} ,{withCredentials : true})
    .then(res => {
      // I feel like there has to be a more elegant way to do the following
      // But I'm running out of energy 
      let tempEventsList = [...eventsList]
      for ( let i=0; i < tempEventsList.length; i++){
        if (tempEventsList[i]._id === eventId){
          for (let j = 0; j < tempEventsList[i].players.length ; j++){
            if (tempEventsList[i].players[j]._id === userId) {
              tempEventsList[i].players.splice(j)
            }
          }
        }
      }
      setEventsList(tempEventsList)

      let tempFilterEvents = [...filteredEvents]
      for ( let i=0; i < tempFilterEvents.length; i++){
        if (tempFilterEvents[i]._id === eventId){
          for (let j = 0; j < tempFilterEvents[i].players.length ; j++){
            if (tempFilterEvents[i].players[j]._id === userId) {
              tempFilterEvents[i].players.splice(j)
            }
          }
        }
      }
      const sortedEvents = tempFilterEvents.sort((a,b) => new Date(a.eventDate) > new Date(b.eventDate) ? 1 : -1 )
      setFilteredEvents(sortedEvents)
    })
    .catch(err=> console.error(err))
  }

  // TODO: Would be cool to add conditional styling for events that are in the past.
  return (
    <div>
      <Navbar/>
      <SearchForm eventsList={eventsList} setFilteredEvents={setFilteredEvents}/>
      <div className="flex mt-20 relative overflow-x-auto shadow-md justify-center sm:rounded-lg">
      <table className="w-1/2 text-sm text-left rtl:text-right  text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">Event Name</th>
              <th scope="col" className="px-6 py-3">Location</th>
              <th scope="col" className="px-6 py-3">Attendees</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Creator</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
          { filteredEvents ? filteredEvents.map(event => 
              <tr className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-600" key={event._id}>
                <td className="px-6 py-4">
                  <Link to={`/events/${event._id}`}>{event.eventTitle}</Link>
                </td>
                <td className="px-6 py-4">
                  {event.location.locationName}
                </td>
                <td className="px-6 py-4">
                  {event.players.length} / {event.maxPlayers}
                </td>
                <td className="px-6 py-4">
                  {new Date(event.eventDate).toLocaleDateString() + " "}
                  {new Date(event.eventDate).toLocaleTimeString([],{ timeStyle: 'short'})}
                </td>
                <td className="px-6 py-4">
                  {event.creator.firstName} {event.creator.lastName} 
                </td>
                <td className="px-6 py-4">
                  { new Date(event.eventDate) < new Date() ? <span className=" md:p-0 text-white dark:text-white border-gray-700">Past</span> : userIsPlayer(event) ? 
                    <span className="rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700 cursor-pointer" onClick={() => handleDrop(event._id)}>Drop</span>
                     :
                     event.players.length >= event.maxPlayers ? <span className=" md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 dark:text-white md:hover:bg-transparent border-gray-700">Full</span> 
                     : 
                     <span className=" md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 dark:text-white md:hover:bg-transparent border-gray-700 cursor-pointer" onClick={() => joinHandler(event._id)}>Join</span> } 
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