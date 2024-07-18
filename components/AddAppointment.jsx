import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const AddAppointment = ({ addAppointment, setAddButtonToggled, selectedDate, appointments }) => {
  const [Customer, setCustomer] = useState('');
  const [time, setTime] = useState('');
  const [Phone, setPhone] = useState('');
  const [Stylist, setStylist] = useState('');
  const [Service, setService] = useState('');
  const [Notes, setNotes] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
  }

  useEffect(() => {
    // Generate times from 9 to 21 (24-hour format)
    const times = Array.from({ length: 13 }, (_, index) => index + 9);
    setAvailableTimes(times);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment({ Customer, time, Phone, Stylist, Service, Notes }, selectedDate);
    setCustomer('');
    setTime('');
    setPhone('');
    setStylist('');
    setService('');
    setNotes('');
    setAddButtonToggled(false);
  };

  const isTimeAvailable = (time) => {
    const timeString = time.toString();
    return !appointments || !appointments[timeString];
  };

 

  const handleTimeClick = (time) => {
    setTime(time.toString());
    onCloseModal();
  };

  return (
    <div className="add-appointment">
      <h2>Add customer and appointment</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Customer" value={Customer} onChange={(e) => setCustomer(e.target.value)} required />
        <button type="button" onClick={onOpenModal}>
          Select Time
        </button>
        
        <input type="text" placeholder="Phone" value={Phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="text" placeholder="Stylist" value={Stylist} onChange={(e) => setStylist(e.target.value)} />
        <input type="text" placeholder="Service" value={Service} onChange={(e) => setService(e.target.value)} />
        <textarea placeholder="Notes" value={Notes} onChange={(e) => setNotes(e.target.value)}></textarea>
        <button type="submit">Add Appointment</button>
      </form>
      <Modal open={open} onClose={onCloseModal} center className="modal">
            <div className="legends">
              <p>Booked</p>
              <p><strong>Time Slots</strong></p>
              <p>Available</p>
            </div>
            <div className="time-selector">
              {availableTimes.map((t, index) => (
                <button
                  key={index}
                  className={isTimeAvailable(t) ? "green-button" : "red-button"}
                  onClick={() => handleTimeClick(t)}
                  disabled={!isTimeAvailable(t)}
                >
                  {t}:00
                </button>
              ))}
            </div>
          
      </Modal>
    </div>
    
  );
};

export default AddAppointment;
