const HDWalletProvider = require('truffle-hdwallet-provider');
const moduleConfig = require('moduleConfig')

module.exports = {
  networks: {
    test: {
     host: "127.0.0.1",       // Localhost (default: none)
     port: 7545,              // Standard ganache-cli port (default: none)
     network_id: "*",         // Any network (default: none)
    },
    rinkeby: {
      provider: () => new HDWalletProvider(moduleConfig.common.mnemonic, moduleConfig.rinkeby),
      network_id: 4,          // Rinkeby's id
      skipDryRun: true        // Skip dry run before migrations? (default: false for public nets )
    },
    mainnet: {
      provider: () => new HDWalletProvider(moduleConfig.common.mnemonic, moduleConfig.mainnet),
      network_id: 1,
      gas: moduleConfig.common.gas,
      gasPrice: moduleConfig.common.gasPrice
    },
    kovan: {
      provider: () => new HDWalletProvider(moduleConfig.common.mnemonic, moduleConfig.kovan, 1),
      network_id: 42,
      gas: moduleConfig.common.gas,
      gasPrice: moduleConfig.common.gasPrice,
      skipDryRun: true
    }
  },

  compilers: {
    solc: {
      version: "0.4.25",
       optimizer: {
         enabled: true,
         runs: 200
       }
    }
  }
}
