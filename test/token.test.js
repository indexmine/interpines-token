const chai = require('chai')
const assert = chai.assert
const BigNumber = web3.BigNumber
chai.use(require('chai-bignumber')(BigNumber)).should()
const truffleAssert = require('truffle-assertions')

const InterpinesToken = artifacts.require('InterpinesToken')

const revertMsg = 'VM Exception while processing transaction: revert'

contract('InterpinesToken', function ([operator, stranger, ...accounts]) {
  describe('token balance', function () {
    let interpinesToken
    let name = "InterpinesToken"
    let symbol = "IPT"
    let decimals = 18
    let initialSupply = 1000000000
    let checkInitialBalance = 1000000000 * (10 ** decimals)
    let testBalance = 10000
    let checkTestBalance = 10000 * (10 ** decimals)

    beforeEach(async () => {
      interpinesToken = await InterpinesToken.new(name, symbol, decimals, initialSupply, { from: operator })
    })

    it('should return initial supply balance', async () => {
      let balance = await interpinesToken.balanceOf(operator)
      assert.equal(balance, checkInitialBalance)
    })

    it('should transfer all tokens to another account', async () => {
      await interpinesToken.transfer(stranger, checkInitialBalance, { from: operator })
      let receivedBalance = await interpinesToken.balanceOf(stranger)
      assert.equal(receivedBalance, checkInitialBalance)
    })

    it('should be no token quantity when burned', async () => {
      await interpinesToken.burn(initialSupply, { from: operator })

      let balance = await interpinesToken.balanceOf(operator)
      assert.equal(balance, 0)

      let totalSupply = await interpinesToken.totalSupply()
      assert.equal(totalSupply, 0)
    })

    it('shouldn\'t transfer when tokens are paused ', async () => {
      await interpinesToken.pause()
      await truffleAssert.reverts(interpinesToken.transfer(stranger, initialSupply, { from: operator }), revertMsg)
    })

    it('should transfer when tokens are unpaused', async () => {
      await interpinesToken.pause()
      await truffleAssert.reverts(interpinesToken.transfer(stranger, initialSupply, { from: operator }), revertMsg)

      await interpinesToken.unpause()
      await interpinesToken.transfer(stranger, initialSupply, { from: operator })
      let balance = await interpinesToken.balanceOf(stranger)
      assert.equal(balance, checkInitialBalance)
    })

    it('only owner can pause tokens', async () => {
      await truffleAssert.reverts(interpinesToken.pause({from: stranger}))
    })

    it('only owner can burn tokens', async () => {
      await interpinesToken.transfer(stranger, testBalance, { from: operator })

      let balance = await interpinesToken.balanceOf(stranger)
      assert.equal(balance, checkTestBalance)

      await truffleAssert.reverts(interpinesToken.burn(testBalance, { from: stranger }), revertMsg)
    })
  })
})
