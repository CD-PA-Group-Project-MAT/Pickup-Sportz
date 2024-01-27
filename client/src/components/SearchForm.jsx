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
    <div>
      <form onSubmit={searchHandler}>
        <label htmlFor="">Search:</label>
        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        <label htmlFor="">Search By:</label>
        <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
          <option value="eventTitle">Event Name</option>
          <option value="locationName">Location</option>
          <option value="eventDate">Date</option>
          <option value="notFull">Openings</option>
          <option value="creatorName">Creator</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SearchForm;
