import React from 'react';

const AppointmentDetails = ({ appointment }) => {
  return (
    <div className="appointment-details">
      <h2>Appointment Details</h2>
      <p><strong>Customer:</strong> {appointment.Customer}</p>
      <p><strong>Phone:</strong> {appointment.Phone}</p>
      <p><strong>Stylist:</strong> {appointment.Stylist}</p>
      <p><strong>Service:</strong> {appointment.Service}</p>
      <p><strong>Notes:</strong> {appointment.Notes}</p>
    </div>
  );
};

export default AppointmentDetails;
