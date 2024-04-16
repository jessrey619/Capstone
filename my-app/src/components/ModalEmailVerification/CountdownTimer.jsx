import React, { useState, useEffect } from "react";

const CountdownTimer = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(2); // 5 minutes in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          clearInterval(intervalId);
          onComplete(); // Callback when countdown completes
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onComplete]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div>
      <p>Can resend in: {minutes}:{seconds < 10 ? "0" : ""}{seconds}</p>
    </div>
  );
};

export default CountdownTimer;