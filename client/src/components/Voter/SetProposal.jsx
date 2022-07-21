import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

const SetProposal = () => {
  const { state: { contract, accounts } } = useEth();

    const addProposal = async() => {
        const proposal = document.getElementById("Prop").value;
        console.log("La proposition est égale à : " + proposal);
        const transac = await contract.methods.addProposal(proposal).send({from: accounts[0]});
        const event = transac.event.ProposalRegistered.returnValues.proposalId;
        console.log("L'event est : " + event);
        alert("Vous avez bien enregistré votre proposition, qui détient l'Id : " + event);
    }

  return (
    <div className="Proposal">
        <input type="text" id="Prop" placeholder="Ecrivez votre proposition." />
        <button className="butt" onClick={addProposal}>Envoyer</button>
    </div>
  )
}

export default SetProposal;