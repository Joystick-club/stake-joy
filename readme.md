### JOY StakingRewards

This contract allows users to deposit ERC20 tokens named "JOY" and rewards stakers with an ERC20 token named "PTS" the longer they leave their JOY staked.

This smart contract is a staking rewards contract that allows users to deposit JOY tokens, earn rewards in PTS tokens, and withdraw their staked JOY tokens. The contract uses the OpenZeppelin SafeERC20 and SafeMath libraries to perform safe math operations and to interact with ERC20 tokens in a safe manner.

The contract has the following main features:

- It maintains a mapping of staked JOY balances and staked JOY timestamps for each user.
- It allows users to deposit JOY tokens and start staking them by calling the deposit function. This function ensures that the user has approved the transfer of JOY tokens from their account, has enough JOY balance, and transfers the staked JOY tokens to the contract.
- It allows users to withdraw JOY tokens and stop staking them by calling the withdraw function. This function ensures that the user has enough staked JOY tokens, updates the staked balance and timestamp for the user, and transfers the withdrawn amount of JOY tokens to the user.
- It allows users to claim rewards earned from staking by calling the claimRewards function. This function calculates the rewards earned by the user, transfers the rewards to the user in PTS tokens, resets the rewards earned for the user, and updates the staked timestamp for the user.
- The contract also has a constructor that initializes the contract by setting the JOY and PTS token contract addresses and the reward rate per second.

### Contract Variables:

`joyTokenAddress`: Address of the JOY ERC20 token contract

`ptsTokenAddress`: Address of the PTS ERC20 token contract

`stakedBalances`: Mapping of staked JOY balances for each user

`stakedTimestamps`: Mapping of staked JOY timestamps for each user

`rewardsEarned`: Mapping of rewards earned for each user

`rewardRate`: Reward rate per second


### Contract Functions:

`deposit(amount: uint256)`: Allows a user to deposit JOY tokens and start staking.

`withdraw(amount: uint256)`: Allows a user to withdraw JOY tokens and stop staking.

`claimRewards()`: Allows a user to claim rewards earned from staking.
