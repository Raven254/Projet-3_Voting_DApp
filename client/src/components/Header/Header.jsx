import React, { Component, useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Voting from "../../contracts/Voting";
import "./Header.css";


const Header = () => {
    const [Owner, setOwner] = useState("");
    const [Authorized, setAuthorized] = useState(false);
    const {state: { contract, accounts }} = useEth();
    //const voter = ({accounts} === props.voter);

    useEffect( () => {
        const getOwner = async() => {
            const owner = await contract.methods.owner().call();
            setOwner(owner);
        }

        const isVoter = async() => {
            const voter = await contract.methods.getVoter(accounts[0]).call();
            setAuthorized(voter[0]);
        }
          
        }, []);

    return (
        <><>
            <div className="Titre">
                <h1>Voting DApp</h1>
            </div>
        </><>
            <div className="Adresse">
                <p> Votre adresse: {accounts}</p> 
            </div>
        </></>
    )
}

export default Header;