// ERC20Token.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "@openzeppelin/contracts/utils/math/SafeMath.sol";



contract ERC20Token is ERC20 {  
    using SafeMath for uint;
    address public admin;
    uint public maxTotalSupply;

    constructor(uint256 _maxTotalSupply, string memory name, string memory symbol) ERC20(name, symbol) public{
       admin = msg.sender;
       maxTotalSupply = _maxTotalSupply;
       //_mint(msg.sender, initialSupply);
   }

   function updateAdmin(address newAdmin) external{
       require(msg.sender == admin,'only admin');
       admin = newAdmin;
   }

   function mint(address account, uint256 amount) external{
        require(msg.sender == admin,'only admin');
        uint totalSupply = totalSupply();
        require(totalSupply.add(amount) <= maxTotalSupply,'max total supply limit');
        _mint(account,amount);
   }
}
