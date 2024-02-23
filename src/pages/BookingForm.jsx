import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TextField from '@mui/material/TextField';

const BookingForm = () => {


  return (
    <>
      <Navbar />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Footer />
    </>
  );
};

export default BookingForm;
