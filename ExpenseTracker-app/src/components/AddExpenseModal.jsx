import React, { useState } from 'react';
import './App.css'; 
const AddExpenseModal = ({ onClose, onSubmit }) => {
  const [expenseName, setExpenseName] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expenseName || !date || !category || !amount) {
      alert('Please fill in all fields.');
      return;
    }
    onSubmit({
      name: expenseName,
      date,
      category,
      amount: parseFloat(amount),
    });
    setExpenseName('');
    setDate('');
    setCategory('');
    setAmount('');
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h2>Add Expense</h2>
        <button onClick={onClose} className="modal-close-button">&times;</button>
      </div>
      <form onSubmit={handleSubmit} className="modal-body">
        <label>
          Expense Name*
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="Expense Name"
            required
          />
        </label>
        <label>
          Date*
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Category*
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Choose a Category</option>
            <option value="Food & Drinks">Food & Drinks</option>
            <option value="Groceries">Groceries</option>
            <option value="Travel">Travel</option> 
            <option value="Health">Health</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </label>
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
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpenseModal;