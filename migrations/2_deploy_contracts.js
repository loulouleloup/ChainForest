var Token = artifacts.require("ERC20Token");
var ICO = artifacts.require("Ico");


module.exports = async function(deployer) {
  const totalSupply = 21000000;
  //Token
  deployer.deploy(Token, totalSupply, 'ChainForest', 'CF');
  const token = await Token.deployed();
  console.log('token address ',token.address);
  
  //ICO
   deployer.deploy(ICO, token.address, 3600000, 1, totalSupply, 1, 100);
   const ico = ICO.deployed();

   await token.updateAdmin(ico.address);
   await ico.start();

  
};
