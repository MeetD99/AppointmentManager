import React from 'react';

const Sidebar = ({ appointments, setSelectedAppointment, setAddButtonToggled, activeTime, setActiveTime }) => {
  return (
    <div className="sidebar-main">
      {Object.keys(appointments).map((time, index) => (
        <button key={index} onClick={() => {
            setSelectedAppointment(appointments[time]); 
            setAddButtonToggled(false);
            setActiveTime(time);
          }}
          id={activeTime === time ? 'active' : ''}
          >
          {time}:00 - {appointments[time].Customer}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
