import React, { useState } from 'react';
import './App.css';
import GenerateOtp from './GenerateOtp';

function App() {
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setMobile(event.target.value);
  };

  const handleGenerateOtp = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    fetch('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile }),
    })
      .then((response) => {
        if (response.ok) {
          setOtpSent(true);
          setError('');
        } else {
          throw new Error('Failed to generate OTP');
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleClearInput = () => {
    setMobile('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Generate OTP</h1>
      </header>
      <main>
        <GenerateOtp
          mobile={mobile}
          otpSent={otpSent}
          error={error}
          onInputChange={handleInputChange}
          onGenerateOtp={handleGenerateOtp}
          onClearInput={handleClearInput}
        />
      </main>
    </div>
  );
}

export default App;
