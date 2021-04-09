// SPDX-License-Identifier: MIT
pragma solidity 0.6.11;
pragma experimental ABIEncoderV2;



/**
 * @title DefiLiaison
 * @author : louis plessis
 * @notice Projet final
 * @dev 
 */
 contract DefiLiaison {
    
   

    constructor() public {
      
    }

    modifier onlyAdmin() {
        require(admin == msg.sender, "Admin requis");
        _;
    }

      /**
    * @notice Retourne l'adresse de l'admin/owner.
    */
    function owner() external view returns(address) {
        return admin;
    }
   

    
    function sendToDefi() internal {
        

    }
    function GetFromDefi()  internal {
       
    }

  
    
   
}
