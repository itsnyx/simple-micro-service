import React from "react";
import MicroserviceBox from "./components/MicroserviceBox";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <MicroserviceBox microserviceNumber={1} title={"Dollar Price"} />
      <MicroserviceBox microserviceNumber={2} title={"Daily Quote"} />
    </div>
  );
}

export default App;
