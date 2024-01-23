### Pickup-Sportz: Backend Design

## MongoDB collections:

users
* _id | ObjectId
* firstName | String
* lastName | String
* email | String
* birthday | String (ISO format '2022-07-05')
* password | String (hash)
* 'virtual' confirmPassword | Virtual/String
* checkedMessagesDate | Date (last time that the user checked messages so we can search for count of new messages since then)
* userPhotoURL | String

events
* _id | ObjectId
* eventTitle | String
* eventDate | Date (Holds date & time)
* eventDetails (notes) | String
* maxPlayers | Number
* location | ref: Location
* creator | ref: User
* players | ref: User [array]
  * _id
  * firstName
  * lastName
  * email
  * birthday
  * password
  * checkedMessagesDate
  * userPhotoURL
* messages | ref: Message [array]
  * _id 
  * messageContent
  * author | ref: User
    * _id
    * firstName
    * lastName
    * email
    * birthday
    * password
    * checkedMessagesDate
    * userPhotoURL

messages
  * _id | ObjectId
  * messageContent | String
  * author | ref: User
    * _id
    * firstName
    * lastName
    * email
    * birthday
    * password
    * checkedMessagesDate
    * userPhotoURL

locations
* _id | ObjectId
* locationName | String
* address | String
* city | String
* state | String
* locationDetails (notes) | String

## API Routes
user
* app.post("/api/register", Users.register);
* app.post("/api/login", Users.login);
* app.post("/api/logout", Users.logout); 
* app.patch("/api/users/:id", authenticate, Users.updateUser);
* app.post("/api/users", Users.createUser); **TEMPORARY**

event
* app.get("/api/events", EventController.getAllEvents);
* app.get('/api/events/:id', EventController.getEventById);
* app.post('/api/events', EventController.createEvent);
* app.patch('/api/events/:id', EventController.updateEvent);
* app.delete('/api/events/:id', EventController.deleteEvent);

location
* app.get("/api/locations", LocationController.getAllLocations);
* app.get('/api/locations/:id', LocationController.getLocationById);
* app.post('/api/locations', LocationController.createLocation);
* app.patch('/api/locations/:id', LocationController.updateLocation);
* app.delete('/api/locations/:id', LocationController.deleteLocation);

message
* app.get("/api/messages",  MessageController.getAllMessages);
* app.get('/api/messages/:id',  MessageController.getMessageById);
* app.post('/api/messages',  MessageController.createMessage);
* app.patch('/api/messages/:id',  MessageController.updateMessage);
* app.delete('/api/messages/:id',  MessageController.deleteMessage);