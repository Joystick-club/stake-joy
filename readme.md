### JOY StakingRewards

This contract allows users to deposit ERC20 tokens named "JOY" and rewards stakers with an ERC20 token named "PTS" the longer they leave their JOY staked.

### Contract Variables:

`joyTokenAddress`: Address of the JOY ERC20 token contract
`ptsTokenAddress`: Address of the PTS ERC20 token contract
`stakedBalances`: Mapping of staked JOY balances for each user
`stakedTimestamps`: Mapping of staked JOY timestamps for each user
`rewardsEarned`: Mapping of rewards earned for each user
`rewardRate`: Reward rate per second

###Contract Functions:

`deposit(amount: uint256)`: Allows a user to deposit JOY tokens and start staking.
`withdraw(amount: uint256)`: Allows a user to withdraw JOY tokens and stop staking.
`claimRewards()`: Allows a user to claim rewards earned from staking.