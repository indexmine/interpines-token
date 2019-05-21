const InterpinesToken = artifacts.require("InterpinesToken");

module.exports = function(deployer) {
  let tokenName = "Interpines"
  let tokenSymbol = "IPT"
  let decimals = 18
  let initialSupply = 200000000

  deployer.deploy(InterpinesToken, tokenName, tokenSymbol, decimals, initialSupply);
};
