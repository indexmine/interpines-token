const InterpinesToken = artifacts.require("InterpinesToken");

module.exports = function(deployer) {
  let tokenName = "InterpinesToken"
  let tokenSymbol = "IPT"
  let decimals = 18
  let initialSupply = 1000000000

  deployer.deploy(InterpinesToken, tokenName, tokenSymbol, decimals, initialSupply);
};
