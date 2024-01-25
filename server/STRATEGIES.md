### /loginPage

* firstName save to sessionStorage upon login OR registration
* Current userId will be serialized in JWT token and will be used in backend routes wherever we need to find by UserId

### /dashboard -> userId will be in token

* UseEffect upon page load -> axios.get(".../api/users")-> UserController -> getCurrentUser -> User.find( { _id : req.body.userId } ) returns currentUser object with Events populated
* Upper table: todayEvents = currentUser.events.filter((event) =>  { event.eventDate == new Date()})
* Lower table: todayEvents = currentUser.events.filter((event) => { event.eventDate > new Date()})

### /search
* UseEffect / axios.get(".../api/events") from events -> all events -> allEvents

SEARCH TERMS:
* Event Name: allEvents.filter((event) => event.eventTitle == searchTerm)
* Location: allEvents.filter((event) => event.location.locationName == searchTerm)
* Date: allEvents.filter((event) =>   event.eventDate == searchTerm)
* Space available?
* Creator?

### /eventDetail -> eventId comes through route
* Messages box: UseEffect upon page load -> axios.get('.../api/messages/${ event._id }') -> MessageController -> getEventMessages ( { event == eventId}) -> returns eventMessages array with Author populated
* Users tab: useEffect upon page load -> axios.get('.../api/events/${ event._id }') -> EventController -> Event.find( { _id : eventId }) -> returns event with event.players(users) array property

### /userDetail -> userId will be in token
* UseEffect upon page load -> axios.get(".../api/users")-> UserController -> getCurrentUser -> User.find( { _id : req.body.userId } ) returns user object with user.events populated
* "Event History" pastEvents = user.events.filter((event) => event.eventDate < new Date())
* "Future Events" futureEvents = user.events.filter((event) => event.eventDate > new Date())