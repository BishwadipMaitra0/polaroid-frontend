import React, { useState } from 'react';
import '../styles/PersonForm.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GenderOptions = ['Male', 'Female', 'Non Binary', 'Do Not Want to Disclose'];

const MyForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    numberOfPersons: 1,
    persons: [{ name: '', email: '', address: '', gender: '', phone: '' }],
  });

  const handleInputChange = (e, personIndex) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedPersons = [...prevData.persons];
      updatedPersons[personIndex] = {
        ...updatedPersons[personIndex],
        [name]: value,
      };
      return { ...prevData, persons: updatedPersons };
    });
  };

  const handleNumberOfPersonsChange = (e) => {
    const numberOfPersons = parseInt(e.target.value, 10);

    // Generate an array of empty persons 
    const emptyPersons = Array.from({ length: numberOfPersons }, () => ({
      name: '',
      email: '',
      address: '',
      gender: '',
      phone: '',
    }));

    setFormData({
      ...formData,
      numberOfPersons,
      persons: emptyPersons,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or validation here
    console.log('Form data submitted:', formData);
  };

  return (
    <>
    <Navbar />
    <div className="booking-main">
      <form onSubmit={handleSubmit}>
        <div className="booking-contact-essentials">
          <label className="booking-email-label">Number of Persons:</label>
          <input
            className="booking-email-box"
            type="number"
            name="numberOfPersons"
            value={formData.numberOfPersons}
            onChange={handleNumberOfPersonsChange}
            min="1"
            required
          />
        </div>

        {formData.persons.map((person, index) => (
          <div className="booking-contact-essentials" key={`person-${index}`}>
            <h3>Person {index + 1}</h3>
            <label className="booking-email-label">Name:</label>
            <input
              className="booking-email-box"
              type="text"
              name={`name`}
              value={person.name}
              onChange={(e) => handleInputChange(e, index)}
              required
            />

            <label className="booking-email-label">Email:</label>
            <input
              className="booking-email-box"
              type="email"
              name={`email`}
              value={person.email}
              onChange={(e) => handleInputChange(e, index)}
              required
            />

            <label className="booking-email-label">Address:</label>
            <input
              className="booking-address-box"
              type="text"
              name={`address`}
              value={person.address}
              onChange={(e) => handleInputChange(e, index)}
              required
            />

            <label className="booking-email-label">Gender:</label>
            <select
              className="booking-gender-drop-box"
              name={`gender`}
              value={person.gender}
              onChange={(e) => handleInputChange(e, index)}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              {GenderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <br></br>

            <label className="booking-email-label">Phone Number:</label>
            <input
              className="booking-email-box"
              type="tel"
              name={`phone`}
              value={person.phone}
              onChange={(e) => handleInputChange(e, index)}
              pattern="[0-9]{10}"
              required
            />
          </div>
        ))}

        <div className="booking-contact-essentials">
          <label className="booking-email-label">Date:</label>
          <input
            className="booking-email-box"
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <button className="booking-movie-selector" type="submit">Submit</button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default MyForm;
