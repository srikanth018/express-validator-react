// FormComponent.js
import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

const FormComponent = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: event.target.name.value,
          email: event.target.email.value,
        }),
      });

      if (response.ok) {
        navigate('/success'); // Redirect to success page if validation passes
      } else {
        const errorData = await response.json();
        setFormErrors(errorData.errors);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <br />
      <button type="submit">Submit</button>

      {formErrors.length > 0 && (
        <div style={{ color: 'red' }}>
          <p>Form submission failed. Please fix the following errors:</p>
          <ul>
            {formErrors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
    </Form>
  );
};

export default FormComponent;
