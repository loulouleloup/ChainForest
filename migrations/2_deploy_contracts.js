var Token = artifacts.require("ERC20Token");
var ICO = artifacts.require("Ico");


module.exports = async function(deployer) {
  const totalSupply = 21000000;
  //Token
  deployer.deploy(Token, totalSupply, 'ChainForest', 'CF')
  .then(() =>  Token.deployed())

  .then(() =>  deployer.deploy(ICO, Token.address, 3600000, 1, totalSupply, 1, 100));
  const token = await Token.deployed();
  const ico = await ICO.deployed();

  await token.updateAdmin(ICO.address);
  await ico.start();

 
  
};
