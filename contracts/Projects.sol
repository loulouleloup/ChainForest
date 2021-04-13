// SPDX-License-Identifier: MIT
pragma solidity 0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Projets
 * @notice Projet Finale
 * @dev 
 */
  contract Projects is Ownable {
     struct Project {
        string description;
    }

    Project[] private projects;

    event ProjectRegistered(uint projetId);
    event ProjectDeleted(uint projetId);

    uint public result;

     constructor() public {
    }

    function getProject() public  view returns (Project[] memory){
        return projects;
    }

    function registerProjet(string memory _description) public onlyOwner{
        projects.push(Project(_description));
        emit ProjectRegistered(projects.length);
    }

    function deleteProjet(uint idProject) public onlyOwner{
        delete projects[idProject];
        emit ProjectDeleted(projects.length);
    }
    

   
    

   
}
