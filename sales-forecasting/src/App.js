import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ChartComponent from "./components/ChartComponent.js";
import { trainModel, predictSales } from "./ml/forecastModel";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [predictions, setPredictions] = useState([]);

  const handleFileUpload = async (parsedData) => {
    setData(parsedData);
    const model = await trainModel(parsedData);
    const forecasts = predictSales(model, parsedData);
    setPredictions(forecasts);
  };

  return (
    <div className="App">
      <h1>Sales Forecasting App</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <ChartComponent data={data} predictions={predictions} />
    </div>
  );
}

export default App;
