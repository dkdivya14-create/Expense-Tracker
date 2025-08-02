import React, { useState } from 'react';
import './App.css';
const AddBudgetModal = ({ onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      alert('Please enter a valid amount.');
      return;
    }
    onSubmit(parseFloat(amount));
    setAmount('');
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h2>Add Budget</h2>
        <button onClick={onClose} className="modal-close-button">&times;</button>
      </div>
      <form onSubmit={handleSubmit} className="modal-body">
        <label>
          Amount*
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            min="0"
            step="0.01"
            required
          />
        </label>
        <button type="submit">Add Budget</button>
      </form>
    </div>
  );
};

export default AddBudgetModal;