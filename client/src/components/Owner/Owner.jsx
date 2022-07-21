import { useState, useEffect } from "react";
import { EthProvider } from "../../contexts/EthContext";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import SetVoter from "./SetVoter";
import SetPhase from "./SetPhase";
//import NoticeNoArtifact from "./NoticeNoArtifact";
//import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Owner() {
  const { state: { contract, accounts } } = useEth();
  //const { state } = useEth();
  const [ContractOwner, getContractOwner] = useState("Rieng");

 const App = () => {
   
    const getOwner = async() => {
      let owner = await contract.methods.owner().call({from: accounts[0]});
      console.log("OWNER - Le owner 1 hihi est : " + owner);
      getContractOwner(owner);
    };
    getOwner();
    console.log("OWNER - le contrat 1 est : " + contract);
  
  };

  {/* const getOwner = async() => {
    let owner = await contract.methods.owner().call({from: accounts[0]});
    console.log("OWNER - Le owner 1 hihi est : " + owner);
    getContractOwner(owner);
  };*/}
  
  const demo = () => {
    return(
      <>
        <div className="contract-container">
          <SetPhase />
          <SetVoter />
        </div>
      </>
    )
  };

  const ownerInterface = () => {
    return(
      <>
        <div className="demo">
          <Title />
         
          {/*
            !state.artifact ? <NoticeNoArtifact /> :
              !state.contract ? <NoticeWrongNetwork /> :
              */}
                {demo()}
        </div>
      </>
    )
  };

const stop = () => {
  return(
    <>
      <p>Rien trouvé</p>
    </>
  )
};

  return (
    <><>
      {console.log("OWNER - Le owner avant fonction est : " + ContractOwner)}
      {console.log("OWNER - Le owner après fonction est : " + ContractOwner)}
    </>
    <>{!contract ?
      console.log("OWNER - BUG : pas de contrat") :
      App()}

      {!contract ?
      console.log("OWNER - BUG : pas de contrat") :
      ContractOwner === undefined ?
      stop():
      ContractOwner === accounts[0] ? 
      ownerInterface() :
      null}
    </></>
  );

}

export default Owner;
