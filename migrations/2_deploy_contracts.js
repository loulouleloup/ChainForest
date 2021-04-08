var Crowdsale = artifacts.require("./Crowdsale.sol");

module.exports =  function(deployer) {
 // deployer.deploy(Voting);
   deployer.deploy(Crowdsale, 'ChainForest', 'CF', '21000000');

  
};
