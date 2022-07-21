import React, { Component, useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <p className='footer'> <em>En cas de problème, joindre dev@gmail.com.</em></p>
        </footer>
    )
}

export default Footer;