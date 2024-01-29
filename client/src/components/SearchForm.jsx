import { useState } from "react";
import toISODateString from "../utils/toISOdateString";

// TODO: disable searchterm box when searchby == notFull 

function SearchForm(props) {
  const { eventsList, setFilteredEvents } = props;
  const [searchBy, setSearchBy] = useState("eventTitle");
  const [searchValue, setSearchValue] = useState('');


  function handleChangeSearchBy (e) {
    if(e.target.value != searchBy){                            // If switching to a new 'searchBy'
      setSearchValue("");                                      // Clear the search term 
    }
    setSearchBy(e.target.value)                                 // Then update 'searchBy' state
  }

  function handleSearch(e) {
    e.preventDefault();
    switch (searchBy) {
      case "eventTitle":
        setFilteredEvents(eventsList.filter((event) => event.eventTitle.toLowerCase().includes( searchValue.toLowerCase())))
          break;
        case "locationName":
          setFilteredEvents(eventsList.filter((event) => event.location.locationName.toLowerCase().includes( searchValue.toLowerCase())))
          break;
        case "eventDate":
          setFilteredEvents(eventsList.filter((event) => toISODateString(event.eventDate) == searchValue))
          break;
      case "notFull":
          setFilteredEvents(eventsList.filter((event) => event.maxPlayers > event.players.length))
          break;
      case "creatorName":
          setFilteredEvents(eventsList.filter((event) =>  event.creator.firstName.toLowerCase().includes( searchValue.toLowerCase()) || event.creator.lastName.toLowerCase().includes( searchValue.toLowerCase())))
          break;
  
      default:
          break;
    }
    // console.log("search now");
  }

  return (
    <div className="m-5">
      <form onSubmit={handleSearch}>
        <div className="flex justify-center">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search:</label>
        { searchBy == "eventDate" 
        ?        
          <input type="date" className="block w-1/2 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/> 
        : searchBy == "notFull" 
          ?
            <input type="search" className="block w-1/2 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
          :
            <input type="search" className="block w-1/2 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by any category" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        }
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search By:</label>
        <select className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" value={searchBy} onChange={handleChangeSearchBy}>
          <option value="eventTitle">Event Name</option>
          <option value="locationName">Location</option>
          <option value="eventDate">Date</option>
          <option value="notFull">Players needed</option>
          <option value="creatorName">Creator</option>
        </select>
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
