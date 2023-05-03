import React, { useState } from 'react';
import './GenerateOtp.css';

function GenerateOtp() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
      setError('Please enter a valid 10 digit mobile number');
      setSuccess(null);
      return;
    }

    fetch('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile: mobileNumber }),
    })
      .then((response) => {
        if (response.ok) {
          setSuccess('OTP sent successfully');
          setError(null);
          setMobileNumber('');
        } else {
          response.json().then((data) => {
            setError(data.error);
            setSuccess(null);
          });
        }
      })
      .catch((error) => {
        setError('Something went wrong. Please try again later.');
        setSuccess(null);
      });
  };

  return (
    <div className="generate-otp">
      <h2>Generate OTP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter mobile number"
          value={mobileNumber}
          onChange={handleMobileNumberChange}
        />
        <button type="submit">Generate OTP</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
}

export default GenerateOtp;
