import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./style.css";
import CountUp from "react-countup";

const socket = io("http://localhost:8000");

const RegisterComponent = () => {
  const [registerCount, setRegisterCount] = useState(0);

  useEffect(() => {
    socket.on("registerCount", (count) => {
      setRegisterCount(count);
    });

    return () => {
      socket.off("registerCount");
    };
  }, []);

  return (
    <div className="wall-of-love">
      <h3>❤️ WALL OF LOVE</h3>
      <h2>Loved by educators since 2021</h2>
      <div className="flip-display">
        {registerCount.toString().split("").map((digit, index) => (
          <div key={index} className="flip-box">
            <CountUp end={digit} duration={0.01} />
          </div>
        ))}
      </div>
      <p className="trusted-label">TRUSTED USERS</p>
    </div>
  );
};

export default RegisterComponent;
