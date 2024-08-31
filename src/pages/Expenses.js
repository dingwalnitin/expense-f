import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from '@mui/material';
import ExpenseCard from '../components/ExpenseCard';

function Expenses() {
    const [expenses, setExpenses] = useState([]);
    const [open, setOpen] = useState(false);
    const [newExpense, setNewExpense] = useState({ amount: '', category: '', budget: '', description: '', date: '' });
    const [categories, setCategories] = useState([]);
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
        fetchBudgets();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('/api/expenses');
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchBudgets = async () => {
        try {
            const response = await axios.get('/api/budgets');
            setBudgets(response.data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/expenses', newExpense);
            setOpen(false);
            fetchExpenses();
            setNewExpense({ amount: '', category: '', budget: '', description: '', date: '' });
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/expenses/${id}`);
            fetchExpenses();
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Expenses
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Expense
            </Button>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {expenses.map(expense => (
                    <Grid item xs={12} md={6} lg={4} key={expense._id}>
                        <ExpenseCard expense={expense} onDelete={handleDelete} />
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        value={newExpense.amount}
                        onChange={handleInputChange}
                    />
                    <Select
                        margin="dense"
                        name="category"
                        label="Category"
                        fullWidth
                        value={newExpense.category}
                        onChange={handleInputChange}
                    >
                        {categories.map(category => (
                            <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
                        ))}
                    </Select>
                    <Select
                        margin="dense"
                        name="budget"
                        label="Budget"
                        fullWidth
                        value={newExpense.budget}
                        onChange={handleInputChange}
                    >
                        {budgets.map(budget => (
                            <MenuItem key={budget._id} value={budget.category}>{budget.category}</MenuItem>
                        ))}
                    </Select>
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={newExpense.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="date"
                        label="Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={newExpense.date}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Expenses;