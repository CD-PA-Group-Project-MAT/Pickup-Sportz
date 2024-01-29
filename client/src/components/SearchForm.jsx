import { useState } from "react";

function SearchForm(props) {
  const { eventsList, setFilteredEvents } = props;
  const [searchBy, setSearchBy] = useState("eventTitle");
  const [searchValue, setSearchValue] = useState('');

  function searchHandler(e) {
    e.preventDefault();
    switch (searchBy) {
      case "eventTitle":
          setFilteredEvents(eventsList.filter((event) => event.eventTitle == searchValue))
          break;
        case "locationName":
          setFilteredEvents(eventsList.filter((event) => event.location.locationName == searchValue))
          break;
        case "eventDate":
          setFilteredEvents(eventsList.filter((event) => event.eventTitle == searchValue))
          break;
      case "notFull":
          setFilteredEvents(eventsList.filter((event) => event.eventTitle == searchValue))
          break;
      case "creatorName":
          setFilteredEvents(eventsList.filter((event) => event.creator.firstName == searchValue))
          break;
  
      default:
          break;
    }
    console.log("search now");
  }

  return (
    <div className="m-5">
      <form onSubmit={searchHandler}>
        <div className="flex justify-center">
        <label class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search:</label>
        <input type="search" className="block w-1/2 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by any category"value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        <label class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search By:</label>
        <select className= " ml-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
          <option value="eventTitle">Event Name</option>
          <option value="locationName">Location</option>
          <option value="eventDate">Date</option>
          <option value="notFull">Openings</option>
          <option value="creatorName">Creator</option>
        </select>
        <button className= "ml-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
