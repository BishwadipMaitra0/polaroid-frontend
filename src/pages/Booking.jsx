import React, { useState } from 'react';
import './Booking.css';
import Button from './Button';

function SeatSelector() {
  const columns = 12;
  const totalSeats = 120;
  const rows = Math.ceil(totalSeats / columns);

  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <>
    <div className='flex gap-1 flex-col p-2 card justify-centre'>
      {Array.from(Array(rows).keys()).map((seat, index) => (
        <div className='flex gap-1' key={index}>
          {Array.from(Array(columns).keys()).map((column, columnIndex) => {
            const seatNumber = seat * columns + column + 1;
            let seatClass = 'seat';

            if (selectedSeats.includes(seatNumber)) {
              seatClass = `${seatClass} selected-seat`;
            }

            return (
              <div
                key={columnIndex}
                className={seatClass}
                onClick={() => {
                  if (selectedSeats.includes(seatNumber)) {
                    setSelectedSeats(selectedSeats.filter((item) => item !== seatNumber));
                  } else {
                    setSelectedSeats([...selectedSeats, seatNumber]);
                  }
                }}
              >
                <h1 className='text-sm'>{seatNumber}</h1>

                
              </div>
                 

              
            );
          })}
          
        </div>
      ))}

       
    </div>

    </>
  );
}

function Booking() {
  return (
      <div className='flex flex-col items-center '>
      <SeatSelector />
      
      
    </div>

    
  );
}

export default Booking;
