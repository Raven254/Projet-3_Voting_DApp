import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import SetProposal from "./SetProposal";
import SetVote from "./SetVote";

const SetupVoterZone = () => {
  const { state: { contract, accounts } } = useEth();
  const [Status, setStatus] = useState(0);
  const[registered, isRegistered] = useState(false);
  
  useEffect( () => {
    
    
    const voterVerif = async() => {
      try{
        const owner = await contract.methods.owner().call();
        console.log("SETUPVOTERZONE - Le owner est : " + owner);
        const voter = await contract.methods.getVoter(accounts[0]).call({from: owner});
        console.log("SETUPVOTERZONE - Le voter est : " + voter);
        const regisVerif = voter[0];
        console.log("SETUPVOTERZONE - 1 - L'utilisateur est-il autorisé à voter : " + regisVerif);
        isRegistered(regisVerif);
      } catch (error) {
        // Catch any errors for any of the above operations.
        console.error(error);
      }
    }

    const settingStatus = async() => {
      let Status = 340;
      console.log("SETUPVOTERZONE - L'ancien Status est : " + Status);
      console.log('SETUPVOTERZONE - Le contract est : ' + contract);
      Status = await contract.methods.workflowStatus().call({from: accounts[0]});
      console.log("SETUPVOTERZONE - Le nouveau statut est : " + Status);
      console.log("SETUPVOTERZONE - Process is : " + process);
      setStatus(parseInt(Status));
    }
  
    if(contract){
    settingStatus();
    //voterVerif();
    console.log("SETUPVOTERZONE - 2 - L'utilisateur est-il autorisé à voter : " + registered);

    } else {
      <>
        <p>None</p>
      </>
    }
  

}, [contract]);

const addVoterPhase = () => {

  return(
    <div>
      <summary>Phase d'ajout des électeurs par l'administrateur.</summary>
      <p>Vous n'avez pas d'action à réaliser.</p>
    </div>
  )
}  

const SetinProposal = () => {

    return(
      <div>
        <summary>Inscrivez votre proposition ici :</summary>
        <SetProposal />
      </div>
    )
  }

  const Vote = () => {

    return(
      <div>
        <summary>Inscrivez votre vote ici :</summary>
        <SetVote />
      </div>
    )
  }

  const SeeWinner = () => {

    return(
      <details>
        <summary>Install</summary>
        <p>Install Truffle and Ganache globally.</p>
        <code>$ npm install -g truffle ganache</code>
      </details>
    )
  }

  const voterInterface = () => {

    return (
      <>
        <h2> Bienvenue cher électeur.</h2>
        {Status === 0 ? addVoterPhase() : Status === 1 ? SetinProposal() : Status === 3 ? Vote() : Status === 5 ? SeeWinner() : null}
      </>
      )
  }

  const voterAccess = () => {
    const voterVerif = async() => {
      try{
        const owner = await contract.methods.owner().call();
        console.log("SETUPVOTERZONE - Le owner est : " + owner);
        const voter = await contract.methods.getVoter(accounts[0]).call({from: owner});
        console.log("SETUPVOTERZONE - Le voter est : " + voter);
        const regisVerif = voter[0];
        console.log("SETUPVOTERZONE - 1 - L'utilisateur est-il autorisé à voter : " + regisVerif);
        isRegistered(regisVerif);
        alert("Vous avez maintenant accès à votre espace électeur.")
      } catch (error) {
        // Catch any errors for any of the above operations.
        console.error(error);
        alert("Vous n'êtes pas inscrit sur la liste électorale.");
      }
    }
    voterVerif();
    return (
      <>
        {registered === true ? voterInterface() : null }
      </>
  
      )
  }
  
  return(
    <>
      <button onClick={() => voterAccess()}>Accéder à mon espace électeur</button>
      <div>
        {registered === true ? voterInterface() : null }
      </div>
    </>
  )

}

export default SetupVoterZone;
