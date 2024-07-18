import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import AppointmentDetails from '../components/AppointmentDetails';
import AddAppointment from '../components/AddAppointment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
// Gist_Id=f3c733fc60e5a7574c3c1280460526ef

const App = () => {
  const [appointments, setAppointments] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [addButtonToggled, setAddButtonToggled] = useState(false);
  const [activeTime, setActiveTime] = useState(null);
  
  const addAppointment = async (appointment, date) => {
    const dateString = date.toISOString().split('T')[0];
    const updatedAppointments = {
      ...appointments,
      [dateString]: {
        ...appointments[dateString],
        [appointment.time]: appointment
      }
    };
    setAppointments(updatedAppointments);
  
    try {
      const gistId = "f3c733fc60e5a7574c3c1280460526ef";
      const accessToken = import.meta.env.VITE_GITHUB_TOKEN;
      const updatedContent = JSON.stringify(updatedAppointments, null, 2);
  
      await fetch(`https://api.github.com/gists/${gistId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `token ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          files: {
            'appointments.json': {
              content: updatedContent
            }
          }
        })
      });
    } catch (error) {
      console.error('Error updating gist:', error);
    }
  };

  const fetchGist = async () => {
    try {
      const gistId = "f3c733fc60e5a7574c3c1280460526ef"; // Replace with your gist ID
      const accessToken = import.meta.env.VITE_GITHUB_TOKEN;

      const response = await fetch(`https://api.github.com/gists/${gistId}`, {
        headers: {
          Authorization: `token ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch gist');
      }

      const gist = await response.json();
      const content = gist.files['appointments.json'].content;
      const parsedData = JSON.parse(content);
      console.log(parsedData)
      setAppointments(parsedData);
    } catch (error) {
      console.error('Error fetching gist:', error);
    }
  };

  useEffect(() => {
    fetchGist();
  }, []);

  const getTodaysAppointments = () => {
    const dateString = selectedDate.toISOString().split('T')[0];
    return appointments[dateString] || {};
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      
      <div className="sidebar-container">
        <div className="sidebar">
          <p>Booked Appointments</p>
          <p>Select Date</p>
          <DatePicker className="datepicker" selected={selectedDate} onChange={date => setSelectedDate(date)} />
          {Object.keys(getTodaysAppointments()).length > 0 ? (
            <Sidebar 
              appointments={getTodaysAppointments()} 
              setSelectedAppointment={setSelectedAppointment} 
              setAddButtonToggled={setAddButtonToggled}
              activeTime={activeTime}
              setActiveTime={setActiveTime}
            />
          ) : (
            <p>No Appointments yet!</p>
          )}
        </div>
      </div>
      <div className="content">
        <div className="navbar">
          <h1 onClick={handleReload}>THE BARBER SHOP</h1>
          <a href="https://www.linkedin.com/in/meetdholakia2074" target='_blank'><button className="Developer">Developer</button></a>
        </div>
        <div className="app-button">
          <h2>Appointment Management Dashboard</h2>
          {addButtonToggled ? <button onClick={()=>{setAddButtonToggled(false)}}>Cancel</button> : <button onClick={() => {setAddButtonToggled(true);}}>Add Appointment</button>}
        </div>
          {addButtonToggled ? <AddAppointment addAppointment={addAppointment} setAddButtonToggled={setAddButtonToggled} selectedDate={selectedDate} appointments={getTodaysAppointments()}/> 
            : 
              selectedAppointment && <AppointmentDetails appointment={selectedAppointment} />}
        
      </div>
    </div>
  );
};

export default App;
