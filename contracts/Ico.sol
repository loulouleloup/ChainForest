// SPDX-License-Identifier: MIT
pragma solidity 0.7.0;
pragma experimental ABIEncoderV2;

import './ERC20Token.sol';
import './Projects.sol';

/**
 * @title Ico
 * @author : louis plessis
 * @notice Projet final
 * @dev 
 */

  contract Ico {
    using SafeMath for uint;

    struct Sale{
        address invertor;
        uint amount;
        bool tokensWithdrawn;
        uint idProjet;
        uint durationLoan;
    }

    mapping (address => Sale) public sales;
    address public admin;
    uint  public end;
    uint  public duration;
    uint  public price;
    uint  public availableTokens;
    uint  public minPurchase;
    uint  public maxPurchase;
    ERC20Token public CFtoken;
    IERC20 dai = IERC20(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa);
    address public defiContract = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa; //A mettre dans le constructor ==> deploy

     constructor(address tokenAddress, uint _duration, uint _price, uint _availableTokens, uint _minPurchase, uint _maxPurchase) public {
       CFtoken = ERC20Token(tokenAddress);
        require(_duration > 0,'_duration shloud be > 0');
        require(_availableTokens > 0 && _availableTokens <= CFtoken.maxTotalSupply(),'_availableTokens should be > 0 and <= maxTotalSupply');
        require(_minPurchase > 0,'_minPurchase shloud be > 0');
        require(_maxPurchase > 0 && _maxPurchase <= availableTokens,'_maxPurchase should be > 0 and <= availableTokens');

        admin = msg.sender;
        duration = _duration;
        price = _price;
        availableTokens = _availableTokens;
        minPurchase = _minPurchase;
        maxPurchase = _maxPurchase;
    }

    modifier onlyAdmin(){
        require(msg.sender == admin,'only admin');
        _;
    }
    modifier icoActive(){
        require(end > 0 && block.timestamp < end && availableTokens > 0,'ico must be active');
        _;
    }
    modifier icoNotActive(){
        require(end == 0,'ico should not be active');
        _;
    }
    modifier loanEnded(){
         Sale storage sale = sales[msg.sender];  
        require(sale.durationLoan >= block.timestamp,'only in time');
        _;
    }
    modifier loanActive(){
         Sale storage sale = sales[msg.sender];  
        require(sale.durationLoan <= block.timestamp,'only in time');
        _;
    }
    function start() external onlyAdmin() icoNotActive(){
        end = block.timestamp + duration;
    }

    function buy(uint daiAmount, uint durationLoan, uint idProjet) external icoActive(){
        require(daiAmount >= minPurchase && daiAmount <= maxPurchase,' daiAmount should be between min and max purchase');
        uint tokenAmount = daiAmount.div(price);
        require(tokenAmount <= availableTokens,'not enought token');
        dai.transferFrom(msg.sender, address(this), daiAmount); //address(this) à remplacer par defiContract address
        sales[msg.sender] = Sale(msg.sender,tokenAmount,false,idProjet,durationLoan);
    }

    function withdrawTokens() external loanActive(){
        Sale storage sale = sales[msg.sender];  
        require(sale.amount > 0,'only invertors');
        require(sale.tokensWithdrawn == false,'tokens were already withdraw');

        sale.tokensWithdrawn = true;
        CFtoken.transfer(sale.invertor,sale.amount);
    }

    function withdrawDai() external loanEnded(){
        Sale storage sale = sales[msg.sender];  
        require(sale.amount > 0,'only invertors');
        dai.transfer(admin, sale.amount ); //admin à remplacer par defiContract address

    }
   
}