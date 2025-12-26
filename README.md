// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/BEP20/IBEP20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract StakingYHR is ReentrancyGuard {
    IBEP20 public yhrToken = IBEP20(0x6772Ed6ee3130bb80aFF555A601CDCE961097186);
    uint256 public rewardRate = 1 * 10**16;

    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public lastClaimTime;

    function stake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount > 0");
        yhrToken.transferFrom(msg.sender, address(this), _amount);
        stakedAmount[msg.sender] += _amount;
        lastClaimTime[msg.sender] = block.timestamp;
    }

    function withdraw(uint256 _amount) external nonReentrant {
        require(stakedAmount[msg.sender] >= _amount, "Not enough");
        uint256 reward = calculateReward(msg.sender);
        stakedAmount[msg.sender] -= _amount;
        yhrToken.transfer(msg.sender, _amount + reward);
        lastClaimTime[msg.sender] = block.timestamp;
    }

    function calculateReward(address _staker) internal view returns (uint256) {
        uint256 timeElapsed = block.timestamp - lastClaimTime[_staker];
        uint256 reward = (stakedAmount[_staker] * rewardRate * timeElapsed) / (1 days * 1e18);
        return reward;
    }
}
