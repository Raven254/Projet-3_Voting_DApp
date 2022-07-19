import React, { useState, useEffect } from "react";
import { EthProvider } from "./contexts/EthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Header />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;