import React from 'react'
import Navbar from './Navbar'

const Dashboard = () => {
  return (
      <div>
        {<Navbar/>}
        {/* table page - need to style so tired */}
        <div>
            {/* Your Events Title */}
            <div>
                <h1>Your Events</h1>
            </div>
            {/* Todays events table */}
            <table>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Location</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Basketball</td>
                        <td>Bryant Park</td>
                        <td>4PM PST</td>
                    </tr>
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
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Baseball</td>
                        <td>Dodger Stadium</td>
                        <td>7PM PST</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    




  )
}

export default Dashboard