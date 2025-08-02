import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
function ExpenseBarChart({ expenses }) {
  const monthlyAggregatedExpenses = new Map(); 
  const uniqueMonths = new Set(); 
  if (expenses && expenses.length > 0) {
    expenses.forEach(expense => {
      if (!expense.date) {
        console.warn("Expense without a date encountered:", expense);
        return; 
      }
      const date = new Date(expense.date);
      const yearMonthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const currentAmount = monthlyAggregatedExpenses.get(yearMonthKey) || 0;
      monthlyAggregatedExpenses.set(yearMonthKey, currentAmount + expense.amount);
      uniqueMonths.add(yearMonthKey); 
    });
  }
  const sortedUniqueMonths = Array.from(uniqueMonths).sort();
  const chartData = [];
  const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  sortedUniqueMonths.forEach(yearMonthKey => {
    const [year, month] = yearMonthKey.split('-').map(Number);
    const displayDate = new Date(year, month - 1, 1);
    const monthNameShort = shortMonthNames[displayDate.getMonth()];
    const yearSuffix = String(displayDate.getFullYear()).slice(-2);
    const displayMonthName = `${monthNameShort} '${yearSuffix}`; 
    const actualExpenses = monthlyAggregatedExpenses.get(yearMonthKey) || 0;
    chartData.push({
      name: displayMonthName, 
      'Actual Expenses': actualExpenses, 
    });
  });
  if (chartData.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#888',marginLeft:'35%' }}>
        No monthly expense data to display
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="Actual Expenses" 
          name="Expenses" 
          fill="#4B00FF" 
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ExpenseBarChart;