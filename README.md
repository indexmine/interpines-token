# Fill up params

 * contracts/FlyUpToken.sol : token contract allocation balance
 * migrations/2_interpines_token.js : token's name, symbol, decimals
 * truffle-config.js : infuraApiKey, gas, gasPrice, mnemonic

# Set up

 * deploy contract
    >$ truffle migrate --network [mainnet / rinkeby / kovan]
 * keep your contract address
# Usage (after set up)

1. copy abi file
    >$ cp ./build/contracts/InterpinesToken.json ./metamask/public/javascripts/InterpinesToken.js

2. fill up the contract address
    >$ vi ./metamask/public/javascripts/index.js
    * find the /** here **/ statement and change it to newly deployed contract address

3. run local server
    >$ DEBUG=metamask:* npm start

4. open browser console
    * (in browser console)
    >\> totalSupply()
    
# Test
    >$ ganache-cli -i 5777 -p 7545
    * in another console
    >$ truffle console --network test
    truffle(test)> migrate
    truffle(test)> test

    ** or just using script
    > npm test
