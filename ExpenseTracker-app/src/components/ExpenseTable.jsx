import React from 'react';
function ExpensesTable({ expenses, onEdit, onDelete }) {
  return (
    <div className="expenses-table-container">
      <table>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Expense</th>
            <th>Amount</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-expenses">No expenses added yet.</td>
            </tr>
          ) : (
            expenses.map((expense, index) => (
              <tr key={expense.id}>
                <td>{index + 1}</td>
                <td>{expense.name}</td>
                <td>₹{expense.amount.toLocaleString()}</td>
                <td className="table-actions">
                  <button
                    className="table-action-button edit-button"
                    onClick={() => onEdit(expense.id)}
                  >
                     Edit
                  </button>
                  <button
                    className="table-action-button delete-button"
                    onClick={() => onDelete(expense.id)}
                  >
                     Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExpensesTable;