pragma solidity ^0.5.0;
import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm{
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public isStaked;
    mapping(address => bool) public hasStaked;

    constructor(DappToken _dapptoken, DaiToken _daitoken) public{
        dappToken = _dapptoken;
        daiToken = _daitoken;
    }

    // 1. Stakes Tokens (Deposit)
    function stakeTokens(uint _amount) public {
        //Transfer Mock Dai token to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        //Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        //Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        //Update staking status
        isStaked[msg.sender] = true;
        hasStaked[msg.sender] = true;
    } 

    //  Unstaking Tokens (Withdraw)

    //  Issuing Token (Pay Interest)
    // function issueToken() public {

    // }

}