// SPDX-License-Identifier: MIT
pragma solidity 0.6.11;
pragma experimental ABIEncoderV2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.0.0/contracts/access/Ownable.sol";

/**
 * @title Projets
 * @notice Projet Finale
 * @dev administrateur du vote = owner
 */
 contract Projet is Ownable {
   
  
    event ProjetRegistered(uint projetId);


    

    

    // index de la proposition ayant reçu le plus de votes, commence à 0
    uint public result;

    //has_DAI?
    modifier isWhitelisted() {
        require(whitelist[msg.sender] > 0, "Vous n'êtes pas inscrit !");
        _;
    }

    
    constructor() public {
    }


     /**
     * @notice Permet de récupérer la liste des projets.
     */
    function getProjet() public  view returns (Proposal[] memory){
        require(workflowStatus != WorkflowStatus.RegisteringVoters, "La phase d'enregistrement des propositions n'a pas commencé !");

        return proposals;

       
    }

    /**
     * @notice Les électeurs inscrits sont autorisés à enregistrer leurs propositions pendant que la session d'enregistrement est active.
     */
    function registerProjet(string memory _description) {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, "La phase d'enregistrement des propositions n'est pas en cours !");
        uint voterId = whitelist[msg.sender] - 1;
        require(voters[voterId].hasProposed == false, "Vous avez déjà fait une proposition !");
        proposals.push(Proposal(_description, 0));
        emit ProposalRegistered(proposals.length);
    }

    

   
    

    /**
     * @notice L'administrateur comptabilise les tokens reçu par projet.
     */
    function result() public onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionEnded, "La session de vote n'est pas terminée !");
        uint maxVoteCount = 0;
        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > maxVoteCount) {
                winningProposalId = i;
                maxVoteCount = proposals[i].voteCount;
            }
        }
        workflowStatus = WorkflowStatus.VotesTallied;
        emit VotesTallied();
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }
}
