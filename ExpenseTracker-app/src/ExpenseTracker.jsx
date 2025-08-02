import React from 'react';

function ExpenseTracker({ totalBudget, totalExpense, remainingBudget, onAddExpenseClick, onAddBudgetClick, searchTerm, onSearchChange, selectedCategory, onCategoryChange }) {
  const categories = [
    'All Expenses',
    'Food & Drinks',
    'Groceries',
    'Travelling',
    'Health',
  ];

  return (
    <div className="expense-tracker-container">
      <h1>Hello, Divya Krishna</h1>
      <div className="summary-cards">
        <div className="card">
          <h3>Total Budget</h3>
          <p>₹{totalBudget.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Total Expense</h3>
          <p>₹{totalExpense.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Remaining Budget</h3>
          <p>₹{remainingBudget.toLocaleString()}</p>
        </div>
      </div>

      <div className="filter-section">
        <div className="left-section-filters">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="category-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${selectedCategory === (category === 'All Expenses' ? '' : category) ? 'active' : ''}`}
                onClick={() => onCategoryChange(category === 'All Expenses' ? '' : category)}
              >
                {category}
              </button>
            ))}
            <button className="action-button" onClick={onAddBudgetClick}>
              + Add Budget
            </button>
            <button className="action-button" onClick={onAddExpenseClick}>
              + Add Expense
            </button>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default ExpenseTracker;