import React, { useState } from 'react';
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

  // Hook to access the user's web3 provider
  const { accounts, library } = useWeb3();

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

  return (
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
  );
};

export default StakingRewards;
