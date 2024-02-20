import React, { useState } from 'react';
import './PersonForm.css';

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

    // Generate an array of empty persons based on the number of persons selected
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
    <form onSubmit={handleSubmit}>
      <label>
        Number of Persons:
        <input
          type="number"
          name="numberOfPersons"
          value={formData.numberOfPersons}
          onChange={handleNumberOfPersonsChange}
          min="1"
          required
        />
      </label>

      {formData.persons.map((person, index) => (
        <div key={`person-${index}`}>
          <h3>Person {index + 1}</h3>
          <label>
            Name:
            <input
              type="text"
              name={`name`}
              value={person.name}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name={`email`}
              value={person.email}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
          </label>

          <label>
            Address:
            <input
              type="text"
              name={`address`}
              value={person.address}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
          </label>

          <label>
            Gender:
            <select
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
          </label>

          <label>
            Phone Number:
            <input
              type="tel"
              name={`phone`}
              value={person.phone}
              onChange={(e) => handleInputChange(e, index)}
              pattern="[0-9]{10}"
              required
            />
          </label>
        </div>
      ))}

      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
