import React, { Component, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./Header.css";


const Header = () => {
    const {state: { accounts }} = useEth();

    return (
        <><>
            <div className="Adresse">
                <span className="Addr"><strong>Votre adresse</strong> : <em>{accounts}</em></span>
            </div>
        </><>
            <div className="Titre">
                <h1>Voting DApp</h1>
                {/*<h2>Edition { owner ? "Owner" : voter ? "Whitelisté" : "Publique"}</h2>*/}
            </div>
        </></>
    )
}

export default Header;