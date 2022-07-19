import React, { Component, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./Header.css";


const Header = ({Status}) => {
    const {state: { accounts }} = useEth();

    const getStatus = (Status) => {
      
        switch(Status){
          case "0": return "Registering Voters";
            break;
          case "1": return "Proposals registration has started";
            break;
          case "2": return "Proposals registration has ended";
            break;
          case "3": return "Voting session has started";
            break;
          case "4": return "Voting session has ended";
            break;
          case "5": return "Votes Tallied";
            break;

            default: return "Registering Voters";
        }
      }

    return (
        <><>
            <div className="Header">
                <span className="Status"><strong>Phase en cours : </strong> <em>{getStatus(Status)}</em></span>
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