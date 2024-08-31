import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent } from '@mui/material';

function Reports() {
  const [expenseReport, setExpenseReport] = useState({});
  const [categoryReport, setCategoryReport] = useState({});
  const [budgetReport, setBudgetReport] = useState([]);
  
  useEffect(() => {
    axios.get('/api/reports/expenses')
      .then(response => setExpenseReport(response.data))
      .catch(error => console.error(error));
    
    axios.get('/api/reports/categories')
      .then(response => setCategoryReport(response.data))
      .catch(error => console.error(error));
    
    axios.get('/api/reports/budgets')
      .then(response => setBudgetReport(response.data))
      .catch(error => console.error(error));
  }, []);
  
  return (
    <div>
      <Typography variant="h4" gutterBottom>Reports</Typography>
      
      <Card>
        <CardContent>
          <Typography variant="h5">Expense Report</Typography>
          <Typography>Total Expenditure: ₹{expenseReport.totalExpenses}</Typography>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="h5">Category Report</Typography>
          {Object.entries(categoryReport).map(([category, amount]) => (
            <Typography key={category}>{category}: ₹{amount}</Typography>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="h5">Budget Report</Typography>
          {budgetReport.map(budget => (
            <div key={budget.category}>
              <Typography>{budget.category}</Typography>
              <Typography>Limit: ₹{budget.limit}</Typography>
              <Typography>Spent: ₹{budget.spent}</Typography>
              <Typography>Remaining: ₹{budget.remaining}</Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default Reports;