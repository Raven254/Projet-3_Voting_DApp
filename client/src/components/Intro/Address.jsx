import React, { Component, useState, useEffect, useCallback } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./index.css";

function Address() {
  const {state: { contract, accounts }} = useEth();

  return (
    <div className="blocAdresse">
      <span className="Addr"><strong>Votre adresse</strong> : <em>{accounts}</em></span>
    </div>
  );
}

export default Address;
