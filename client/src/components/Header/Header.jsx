import React, { Component, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Voting from "../../contracts/Voting";
import "./Header.css";


const Header = (props) => {
    const {state: { accounts }} = useEth();
    const owner = (props.adresse === props.owner);
    const voter = (props.adresse === props.voter);
    return (
        <><>
            <div className="Titre">
                <h1>Voting DApp</h1>
                <h2>Edition { owner ? "Owner" : voter ? "Whitelisté" : "Publique"}</h2>
            </div>
        </><>
            <div className="Adresse">
                <p> Votre adresse: {accounts}</p> 
            </div>
        </></>
    )
}

export default Header;