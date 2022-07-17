// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

///@title Voting DApp - Application de vote
///@author Marwane E.J. - help.votingDApp@gmail.com
///@notice Cette application vous permet de proposer des idées puis de voter afin d'élire la meilleure d'entre elles.
///@dev Application de vote avec whitelist d'electeurs, vote de proposition et election de la meilleure proposition à la majorité.

contract Voting is Ownable {

    uint public winningProposalID;
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint voteCount;
    }

    enum  WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public workflowStatus;
    Proposal[] proposalsArray;
    mapping (address => Voter) voters;


    event VoterRegistered(address voterAddress); 
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted(address voter, uint proposalId);
    event DepositReceived(address addr);

    ///@dev Modifier pour restreindre l'usage de certaines fonctions aux electeurs enregistrés.
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }
    
    // ::::::::::::: GETTERS ::::::::::::: //

    ///@notice Rapporte toutes les informations liées à l'électeur : whitelisting (ou non), participation au vote et l'ID de la proposition votée.
    ///@dev Getter du mapping voters selon l'adresse.
    ///@param _addr Adresse d'un utilisateur.
    ///@return Voter Retourne l'information contenue dans la struct Voter liée à l'adresse entrée.
    function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }
    
    ///@notice Rapporte toutes les informations liées à l'électeur : whitelisting (ou non), participation au vote et l'ID de la proposition votée.
    ///@dev Getter du mapping voters selon l'adresse.
    ///@param _id Adresse d'un utilisateur.
    ///@return Proposal Retourne l'information contenue dans la struct Voter liée à l'adresse entrée.
    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposalsArray[_id];
    }

 
    // ::::::::::::: REGISTRATION ::::::::::::: // 

    ///@dev Ajoute une adresse au mapping voters. Nécessite le bon workflowStatus.
    ///@param _addr Adresse d'un utilisateur.
    function addVoter(address _addr) external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Voters registration is not open yet');
        require(voters[_addr].isRegistered != true, 'Already registered');
    
        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }
 

    // ::::::::::::: PROPOSAL ::::::::::::: // 

    ///@notice Permet aux électeurs de soumettre au vote une proposition unique et non-vide. Un maximum de 1000 propositions peuvent être soumises.
    ///@dev Ajout d'une proposition _desc dans le tableau proposalsArray. Nécessite le bon workflowStatus.
    ///@param _desc Proposition à soumettre au vote.
    function addProposal(string memory _desc) external onlyVoters {
        require(proposalsArray.length <= 1000, 'Sorry, the maximum number of proposals has already been reached.');
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposals are not allowed yet');
        require(keccak256(abi.encode(_desc)) != keccak256(abi.encode("")), 'You cannot register an empty proposal');

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length-1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    ///@notice Permet aux électeurs de voter une unique fois pour la proposition de leur choix.
    ///@dev Ajout d'un +1 au compteur de vote de la proposition _id. Nécessite le bon workflowStatus.
    ///@param _id ID de la proposition.
    function setVote( uint _id) external onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        require(voters[msg.sender].hasVoted != true, 'You have already voted');
        require(_id < proposalsArray.length, 'Proposal not found');

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //

    ///@dev Change le workflowStatus de RegisteringVoters à ProposalsRegistrationStarted.
    function startProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Registering proposals cant be started now');
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    ///@dev Change le workflowStatus de ProposalsRegistrationStarted à ProposalsRegistrationEnded.
    function endProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Registering proposals havent started yet');
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    ///@dev Change le workflowStatus de ProposalsRegistrationEnded à VotingSessionStarted.
    function startVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, 'Registering proposals phase is not finished');
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    ///@dev Change le workflowStatus de VotingSessionStarted à VotingSessionEnded.
    function endVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }

    ///@dev Boucle qui détermine winninProposalID = la proposition élue avec le plus de voix . Nécessite le bon workflowStatus.
    ///@dev Change le workflowStatus de VotingSessionEnded à VotesTallied.
    function tallyVotes() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionEnded, "Current status is not voting session ended");
        uint _winningProposalId;
        for (uint256 p = 0; p < proposalsArray.length; p++) {
           if (proposalsArray[p].voteCount > proposalsArray[_winningProposalId].voteCount) {
               _winningProposalId = p;
          }
        }
        winningProposalID = _winningProposalId;
       
        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }

    ///@dev Fonction receive
    receive() external payable {
        emit DepositReceived(msg.sender);
    }

    ///@dev Fonction fallback
    fallback() external payable {
        require(msg.data.length == 0, 'We cannot accept your sending.');
        emit DepositReceived(msg.sender);
    }
}