import React, { useState, useEffect } from "react";
import useEth from "./contexts/EthContext/useEth";
import { EthProvider } from "./contexts/EthContext";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  const [addresses, setAddresses] = useState([]);  

  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Header/>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;