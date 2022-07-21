import { useEffect, useState, Component, useCallback} from "react";
import useEth from "../../contexts/EthContext/useEth";

function SetPhase() {
  const { state: { contract, accounts } } = useEth();
  const [Status, setStatus] = useState();
  const [winnerProposal, setWinnerProposal] = useState();

  const upStatus = useCallback(async() => {
    const currStatus = await contract.methods.workflowStatus().call();
    setStatus(currStatus);
}, [contract, setStatus]);

  const getWinner = useCallback(async() => {
    const winnerProposalID = await contract.methods.winnerProposalID().call();
    console.log("SETPHASE - La proposition gagnante est : " + winnerProposalID);
    setWinnerProposal(winnerProposalID);

  });

  const startProposalsRegistering = async() => {
    await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
    upStatus();
}

const endProposalsRegistering = async() => {
    await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
    upStatus();
}

const startVotingSession = async() => {
    await contract.methods.startVotingSession().send({ from: accounts[0] });
    upStatus();
}

const endVotingSession = async() => {
    await contract.methods.endVotingSession().send({ from: accounts[0] });
    upStatus();
}

const tallyVotes = async() => {
    await contract.methods.tallyVotes().send({ from: accounts[0] });
    upStatus();
    getWinner();
}

return(
    <div className="statusButt">
        {parseInt(Status) === 0 ? <button className="butt" onClick={startProposalsRegistering()}>Début de la phase de proposition.</button> : null}
        {parseInt(Status) === 1 ? <button className="butt" onClick={endProposalsRegistering()}>Fin de la phase de proposition.</button> : null}
        {parseInt(Status) === 2 ? <button className="butt" onClick={startVotingSession()}>Début de la phase de vote.</button> : null}
        {parseInt(Status) === 3 ? <button className="butt" onClick={endVotingSession()}>Fin de la phase de vote.</button> : null}
        {parseInt(Status) === 4 ? <button className="butt" onClick={tallyVotes()}>Dépouillement des votes et résultat.</button> : null}
        {parseInt(Status) === 5 ? <p>Voting session  is over.</p> : null}
    </div>
)
}

export default SetPhase;