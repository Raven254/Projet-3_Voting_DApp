import React, { Component, useState, useEffect, useCallback } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Welcome from "./Welcome";
import Address from "./Address";
import Desc from "./Desc";
import Phase from "./Phase";

function Intro() {
  const {state : {contract, accounts}} = useEth();
  const [Status, getStatus] = useState("");

  useEffect(() => {
    const gettingStatus = async() => {
      const statusS = await contract.methods.workflowStatus().call();
      getStatus(statusS);
    }
  }, []);

  return (
    <>
      <Address />
      <Welcome />
      <Phase Status={Status} />
      <Desc />
    </>
  );
}

export default Intro;
