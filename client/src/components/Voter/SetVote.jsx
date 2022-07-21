import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

const SetVote = () => {
  const { state: { contract, accounts } } = useEth();

    const addVote = async() => {
        try{
        const voteID = document.getElementById("vote").value;
        console.log("L'ID du vote est égal à : " + voteID);
        if(0<=voteID<=1000){
        const transac = await contract.methods.setVote(voteID).send({from: accounts[0]});
        const eventVoter = transac.event.Voted.returnValues.voter;
        const eventProposalId = transac.event.Voted.returnValues.proposalId;
        console.log("L'event est : " + eventVoter + " " + eventProposalId);
        alert("Vous avez bien voté pour la proposition n°" + eventProposalId + " avec l'adresse " + eventVoter + " .");
        } else {
          alert("Le vote rentré n'est pas bon.")
        }} catch(error){
          console.log(error);
          alert(error);
        }
    }


  return (
    <div className="Proposal">
        <input type="text" id="vote" placeholder="Soumettez votre vote." />
        <button className="butt" onClick={addVote()}>Envoyer</button>
    </div>
  )

}

export default SetVote;
