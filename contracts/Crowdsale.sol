// SPDX-License-Identifier: MIT
pragma solidity 0.6.11;
pragma experimental ABIEncoderV2;

//import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import './ERC20Token.sol';

import './projet.sol';

import './DefiLiaison.sol';


/**
 * @title Crowdsale
 * @author : louis plessis
 * @notice Projet final
 * @dev administrateur du crowdsale = owner
 */
 contract Crowdsale {
    using SafeMath for uint;
    
  
    uint rate = 1;

   struct Projet {
        string description;
        uint daiCount;
        uint minAmount;
        uint maxAmount;
    }

    struct Donateur {
        uint amount;
        uint duree;
        uint projetId;
    }

    

    ERC20Token public ChainForest;
    
    mapping(address => Donateur) public investors;
    mapping(address => uint) public tokens;
    address[] public investorsList;
    
    IERC20 dai;
    address private admin;

    // pour enregistrer les projets
    Projetl[] private projets;

    

    constructor(string memory name_, string memory symbol_, uint initialSupply_) public {
        ChainForest = new ERC20Token(initialSupply_, name_, symbol_); // déploiement d'une nouvelle instance
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
   

    
    function receiveDAI(uint _amount, uint _projetId, uint _duree) external payable {
            //require min 1 DAI
          
         require(msg.value >= projets[_projetId].minAmount && msg.value  <= projets[_projetID].maxAmount, "Mesage erreur");
            dai.transfer(address(this), amount); 

            var investor = investors[msg.sender];


            investor.amount = _amount;
            investor.duree = _duree;
            investor.projet_id = _projetId;

            //investors[msg.sender] = investors[msg.sender].add(Donateur(amout, duree, projetId));
            distribute(msg.value, 0);
            investorsList.push(msg.sender);

    }
    function distribute(uint256 amount)  internal {
        //changer le rate
       uint256 tokensToSent = amount.mul(rate);
       // On envoie les tokens au moment de l'investing
       // token.transfer(msg.sender, tokensToSent);
       // On souhaite décaler l'envoie des tokens à la fin de la levée de fond
       tokens[msg.sender] = tokens[msg.sender].add(tokensToSent);
    }

    function claimToken() public {
        require(block.timestamp <= investors[msg.sender].duree , "No refund period");
        require(tokens[msg.sender] > 0, "No token for you address");
       
        token.transfer(msg.sender, tokens[msg.sender]);
        tokens[msg.sender] = 0;
    }

    function refund() public {
        require(block.timestamp >= investors[msg.sender].duree, "No refund period");
        require(investors[msg.sender] > 0, "No investing");
        payable(msg.sender).transfer(investors[msg.sender].amount); /*???*/
        investors[msg.sender].amount = 0;
    }

    
   
}
