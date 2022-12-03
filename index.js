import React, { useState, useEffect } from 'react';
import { useWeb3 } from 'web3-react';

// Import the contract ABI and address
import contractABI from './abi.json';
import contractAddress from './address.json';

// Create a contract instance
const contract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider
);

const StakingRewards = () => {
  // State variables to store the form inputs
  const [amount, setAmount] = useState('');

  // State variables to store the total rewards and JOY deposited by the user
  const [totalRewards, setTotalRewards] = useState(0);
  const [totalDeposited, setTotalDeposited] = useState(0);

  // Hook to access the user's web3 provider
  const { accounts, library } = useWeb3();

  // Use useEffect to call the contract's view functions and update the state
  useEffect(() => {
    const getTotalRewards = async () => {
      // Ensure that the user is connected and has an account
      if (!accounts || accounts.length === 0) {
        return;
      }

      // Get the user's account
      const userAccount = accounts[0];

      try {
        // Call the contract's view function to get the total rewards earned by the user
        const totalRewards = await contract.rewardsEarned(userAccount);

        // Update the state
        setTotalRewards(totalRewards);
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    };

    const getTotalDeposited = async () => {
      // Ensure that the user is connected and has an account
      if (!accounts || accounts.length === 0) {
        return;
      }

      // Get the user's account
      const userAccount = accounts[0];

      try {
        // Call the contract's view function to get the total JOY deposited by the user
        const totalDeposited = await contract.stakedBalances(userAccount);

        // Update the state
        setTotalDeposited(totalDeposited);
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    };

    getTotalRewards();
    getTotalDeposited();
  }, [accounts, library]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure that the user is connected and has an account
    if (!accounts || accounts.length === 0) {
      alert('Please connect to a web3 provider and unlock an account');
      return;
    }

    // Get the user's account
    const userAccount = accounts[0];

    try {
      // Call the contract function to deposit JOY tokens
      const transaction = await contract.deposit(
        amount,
        {
          from: userAccount,
        }
      );

      // Wait for the transaction to be mined
      await transaction.wait();

      // Clear the form input
      setAmount('');
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  // Function to handle withdrawal of JOY tokens
  const handleWithdraw = async () => {
    // Ensure that the user is connected and has an account
    if (!accounts || accounts.length === 0) {
      alert('Please connect to a web3 provider and unlock an account');
      return;
    }

    // Get the user's account
    const userAccount = accounts[0];

    try {
      // Call the contract function to withdraw JOY tokens
      const transaction = await contract.withdraw(
        amount,
        {
          from: userAccount,
        }
      );

      // Wait for the transaction to be mined
      await transaction.wait();

      // Clear the form input
      setAmount('');
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  // Function to handle claiming of rewards
  const handleClaimRewards = async () => {
    // Ensure that the user is connected and has an account
    if (!accounts || accounts.length === 0) {
      alert('Please connect to a web3 provider and unlock an account');
      return;
    }

    // Get the user's account
    const userAccount = accounts[0];

    try {
      // Call the contract function to claim rewards
      const transaction = await contract.claimRewards(
        {
          from: userAccount,
        }
      );

      // Wait for the transaction to be mined
      await transaction.wait();
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">
          Amount:
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <button type="submit">Deposit JOY</button>
      </form>
      <button onClick={handleWithdraw}>Withdraw JOY</button>
      <button onClick={handleClaimRewards}>Claim Rewards</button>
      <p>
        Total Rewards Earned: {totalRewards}
      </p>
      <p>
        Total JOY Deposited: {totalDeposited}
      </p>
    </div>
  );
};

export default StakingRewards;