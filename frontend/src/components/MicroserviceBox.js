import axios from "axios";
import React, { useState } from "react";
import "./MicroserviceBox.css";

const BASE_URL = "http://localhost:3000";

const MicroserviceBox = ({ microserviceNumber, title }) => {
  const [responseMessage, setResponseMessage] = useState("");

  const handleBoxClick = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/microservice${microserviceNumber}`
      );
      const message = `I am Microservice ${microserviceNumber}: ${response.data}`;
      setResponseMessage(message);
    } catch (error) {
      console.error(
        `Error calling Microservice ${microserviceNumber}:`,
        error.message
      );
      setResponseMessage(
        `Error calling Microservice ${microserviceNumber}: ${error.message}`
      );
    }
  };

  return (
    <div className="microservice-box">
      <div>
        {title} Microservice
        <button onClick={handleBoxClick} className="click-button">
          Get Information
        </button>
      </div>
      {responseMessage && (
        <div className="response-message">{responseMessage}</div>
      )}
    </div>
  );
};

export default MicroserviceBox;
