// SPDX-License-Identifier: MIT
pragma solidity 0.6.11;
pragma experimental ABIEncoderV2;

//import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import './ERC20Token.sol';


/**
 * @title Voting
 * @author : louis plessis
 * @notice Projet final
 * @dev administrateur du crowdsale = owner
 */
 contract Crowdsale {
    using SafeMath for uint;
    
    enum periodState {
        PRESALE,
        SALE,
        REFUND
    }
    
    //Changer Period en projet?
    struct Period {
        uint startDate;
        uint endDate;
        uint rate;
        uint minAmount;
        uint maxAmount;
    }
    struct Projet {
        string description;
        uint voteCount;
    }
    
    struct Donateur {
        uint period;
        uint amount; 
        uint projetId;
    }

    

    ERC20Token public token;
    
    mapping(address => uint) public investors;
    mapping(address => uint) public tokens;
    address[] public investorsList;
    
    Period[3] public periodList; 
    IERC20 dai;
    address private admin;


    constructor(string memory name_, string memory symbol_, uint initialSupply_) public {
        token = new ERC20Token(initialSupply_, name_, symbol_); // déploiement d'une nouvelle instance
        admin = msg.sender;
        dai = IERC20(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa);
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
   

    // fonction qui permet d'effectuer un transfer de dai ici (sur ce contrat)
    function foo(uint amount) external {
        // quelques instructions
        dai.transfer(address(this), amount);
    }

   
}
