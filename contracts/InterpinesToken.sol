pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

contract InterpinesToken is ERC20Detailed, ERC20Mintable, ERC20Pausable, Ownable {
    using SafeMath for uint256;

    constructor(
        string _name,
        string _symbol,
        uint8 _decimals,
        uint256 _amount
    )
    ERC20Detailed(_name, _symbol, _decimals)
    public {
        require(_amount > 0, "amount have to be greater than 0");
        uint256 initialBalance = _amount.mul(10 ** uint256(_decimals));
        _mint(msg.sender, initialBalance);
    }

    function burn(uint256 value) public onlyOwner {
        _burn(msg.sender, value);
    }
}
