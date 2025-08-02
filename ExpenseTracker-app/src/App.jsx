import React, { useState, useEffect } from 'react';
import ExpenseTracker from './ExpenseTracker';
import AddExpenseModal from './components/AddExpenseModal';
import AddBudgetModal from './components/AddBudgetModal';
import EditExpenseModal from './components/EditExpenseModal';
import ExpensesTable from './components/ExpenseTable';
import './components/App.css'; 
import LocalStorage from './components/LocalStorage'
import PieCharts from './components/PieChart';
import ExpenseBarChart from './components/ExpenseBarchart';
function App() {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [totalBudget, setTotalBudget] = LocalStorage('totalBudget', 0);
  const [expenses, setExpenses] = LocalStorage('expenses', []);
  const [totalExpense, setTotalExpense] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const remainingBudget = totalBudget - totalExpense;
  const handleAddExpenseClick = () => {
    setShowAddExpenseModal(true);
  };
  const handleAddBudgetClick = () => {
    setShowAddBudgetModal(true);
  };
  const handleCloseModal = () => {
    setShowAddExpenseModal(false);
    setShowAddBudgetModal(false);
    setShowEditExpenseModal(false);
    setExpenseToEdit(null); 
  };
  const handleAddExpenseSubmit = (expenseData) => {
    const newExpense = {
      id: expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1, 
      ...expenseData
    };
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    setShowAddExpenseModal(false);
  };
  const handleAddBudgetSubmit = (budgetAmount) => {
    console.log("Add Budget Amount:", budgetAmount);
    setTotalBudget(parseFloat(budgetAmount));
    setShowAddBudgetModal(false);
  };
  const handleEditExpense = (id) => {
    const expense = expenses.find(exp => exp.id === id);
    if (expense) {
      setExpenseToEdit(expense);
      setShowEditExpenseModal(true);
    }
  };
  const handleEditExpenseSubmit = (updatedExpenseData) => {
    setExpenses(prevExpenses => {
      const newExpenses = prevExpenses.map(exp =>
        exp.id === updatedExpenseData.id ? { ...exp, ...updatedExpenseData } : exp
      );
      return newExpenses;
    });
    setShowEditExpenseModal(false);
    setExpenseToEdit(null);
  };
  const handleDeleteExpense = (id) => {
    setExpenses(prevExpenses => {
        return prevExpenses.filter(exp => exp.id !== id);
    })
  };
  useEffect(() => {
    const calculatedTotalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpense(calculatedTotalExpense);
  }, [expenses]);
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearchTerm = expense.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? expense.category === selectedCategory : true;
    return matchesSearchTerm && matchesCategory;
  });
  return (
    <div className="App">
      <header className="app-header">
        <h1>Expense Tracker</h1>
      </header>

      <ExpenseTracker
        totalBudget={totalBudget}
        totalExpense={totalExpense}
        remainingBudget={remainingBudget}
        onAddExpenseClick={handleAddExpenseClick}
        onAddBudgetClick={handleAddBudgetClick}
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      <div className='Charts'>
        <div className='Expense-chart'>
          <h3>Expense Charts</h3>
          <div className='chart-data1'>
            <PieCharts expenses={expenses}/>
          </div>
        </div>
        <div className='Expense-tracker'>
          <h3>Expense Tracker</h3>
          <div className='chart-data2'>
            <ExpenseBarChart expenses={expenses}/> 
          </div>
        </div>
      </div>
      <div className="expense-list-section">
        <h2 className="section-title">Expenses Tracker</h2>
        <ExpensesTable
          expenses={filteredExpenses} 
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </div>
      
      {showAddExpenseModal && (
        <AddExpenseModal onClose={handleCloseModal} onSubmit={handleAddExpenseSubmit} />
      )}

      {showAddBudgetModal && (
        <AddBudgetModal onClose={handleCloseModal} onSubmit={handleAddBudgetSubmit} />
      )}

      {showEditExpenseModal && (
        <EditExpenseModal
          onClose={handleCloseModal}
          onSubmit={handleEditExpenseSubmit}
          initialExpenseData={expenseToEdit}
        />
      )}
    </div>
  );
}

export default App;