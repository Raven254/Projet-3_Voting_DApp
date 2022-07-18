import { EthProvider } from "./contexts/EthContext";
import {useState} from "react";
import React from "react";
import Header from "./components/Header/";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import Proposals from "./components/Proposals";
import Status from "./components/Status";
import Voter from "./components/Voter";
import Voting from "./contracts/Voting.json";


import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <Header /> {/*contient <status>*/} <Status />
        <hr />
        <Admin /> <Voter /> {/* Afficher Admin si owner, sinon voter*/}
        <hr />
        <Proposals />
        <hr />
        <Footer />
      </div>
    </EthProvider>
  );
}

export default App;
