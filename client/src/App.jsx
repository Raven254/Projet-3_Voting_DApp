import EthProvider from "./contexts/EthContext/EthProvider";
import useEth from "./contexts/EthContext/useEth";
import getWeb3 from "./getWeb3";
import React, { Component, useState, useEffect } from "react";
import Header from "./components/Header/Header";
//import Footer from "./components/Footer";
//import Admin from "./components/Admin";
//import Proposals from "./components/Proposals";
//import Status from "./components/Status";
//import Voter from "./components/Voter";
import Voting from "./contracts/Voting.json";

import "./App.css";

function App() {
  const { state: { contract, accounts } } = useEth();
  //const [WorkflowStatus, setWorkflowStatus] = useState(0);
  const [Owner, setOwner] = useState(0);
  const [Authorized, setAuthorized] = useState(false);

  //console.log("Le owner est : " + Owner);


  useEffect ( () => {
    const Init = async () => { 
      const owner = await contract.methods.owner().call();
      console.log("Le owner est : " + owner);
      setOwner(owner);

   //   const workflowStatus = await contract.methods.getWorkflowstatus().call();
   //   console.log("Le WorkflowStatus est : " + workflowStatus);
   //   setWorkflowStatus(workflowStatus);
    
      const isVoter = async () => {
        const voter = await contract.methods.getVoter(accounts[0]).call();
        setAuthorized(voter[0]);
      };

    }}, []);
 
  //const isVoter = async() => {
  //  const {accounts, contract} = this.state;
  //  const voter = await contract.methods.getVoter(accounts[0]).call();
  //  setAuthorized(voter[0]);
 // }

  //if (!web3) {
  //  return <div>Loading Web3, accounts, and contract...</div>;
 // }
  return (
    <EthProvider>
      <div id="App" >
        <h1>Bienvenue</h1>
        <Header adresse={accounts} owner={Owner} voter={Authorized} />
        {/*<Header /> {/*contient <status> <Status />
        <hr />
        <Admin /> <Voter /> {/* Afficher Admin si owner, sinon voter
        <hr />
        <Proposals />
        <hr />
        <Footer />*/}
      </div>
    </EthProvider>
  );
}

export default App;
