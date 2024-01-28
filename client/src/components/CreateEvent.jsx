import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

import axios from 'axios';

// I think I've been staring at this for too long. Need to figure out a way to pass date into state. I am not sure if an empty string is the right move. Also having trouble passing in user into the form. Maybe a hidden input field? I left a note down by location with the form. Not sure how to add value in there. Mapping all of the locations into the select field properly though. 

const CreateEvent = () => {

    const [errors, setErrors] = useState({});
    const [locations, setLocations] = useState([]);
    const [event, setEvent] = useState({
        eventTitle:'',
        eventDate:'',
        eventDetails:'',
        location:''
    });



    useEffect(() => {
        axios.get("http://localhost:8000/api/locations")
        .then(res => {
            setEvent(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    
    // pulling locations from database
    useEffect(() => {
        axios.get("http://localhost:8000/api/locations")
        .then(res => {
            setLocations(res.data)
        })
        .catch(err => console.log(err))
    }, [])


    
  return (
    <div className='bg-gray-900 dark:bg-gray-900'>
        {/* nav bar */}
        <div>
        {<Navbar/>}
        </div>
        <div className='flex flex-col items-center justify-center mx-auto md:h-screen'>
            <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                        Create an Event
                    </h1>
                    {/* on submit needed here */}
                    <form className='space-y-4'>
                        {/* title */}
                        <div>
                            <label htmlFor="eventTitle" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Event Title</label>
                            <input type="text" name="eventTitle" id="eventTitle" className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="Event Title" required="" />
                        </div>
                        {/* event date */}
                        <div>
                        <label  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Event Date</label>
                            <input type="date" name="eventDate" id="eventDate" className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </div>
                        {/* event details */}
                        <div>
                        <label htmlFor="eventDetails" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Event Details</label>
                        <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write the details of the event here..."></textarea>
                        </div>
                        {/* event location */}
                        {/* having trouble with getting that event value squared away for location. Mapped into the select fine. */}
                        <div>
                        <label htmlFor="location" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Location</label>
                        <select  className='bg-gray-50 border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:text-white' onChange={e => setLocationId(e.target.value)} >
                            {locations.map((location) => <option value={location._id}>{location.locationName}</option>)}
                        </select>
                        </div>
                        {/* submit form */}
                        <div className='py-1'>
                        <button type="submit" className="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:text-white">Create Event</button>
                        </div>
                    </form>
                    {/* link to location form */}
                    <div>
                        <Link to="/newlocation" className="text-white">Can't find your location?</Link>
                    </div>
                    
                        

                </div>

            </div>

        </div>
        
        
        
    </div>
    
  )
}

export default CreateEvent