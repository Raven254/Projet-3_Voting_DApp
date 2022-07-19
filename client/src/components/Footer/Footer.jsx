import React, { Component, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./Footer.css";


const Footer = () => {
    const {state: { contract }} = useEth();

    return (
            <div className="Footer">
                <p> <em>En cas de problème, joindre dev@gmail.com.</em></p>
                {console.log(contract)} 
            </div>
    )
}

export default Footer;