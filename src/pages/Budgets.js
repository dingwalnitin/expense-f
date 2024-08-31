import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import BudgetCard from '../components/BudgetCard';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Budgets() {
    const [budgets, setBudgets] = useState([]);
    const [open, setOpen] = useState(false);
    const [newBudget, setNewBudget] = useState({ category: '', limit: '', period: '' });

    useEffect(() => {
        fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/budgets`);
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
        setNewBudget({ ...newBudget, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/api/budgets`, newBudget);
            setOpen(false);
            fetchBudgets();
            setNewBudget({ category: '', limit: '', period: '' });
        } catch (error) {
            console.error('Error adding budget:', error);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Budgets
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Budget
            </Button>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {budgets.map(budget => (
                    <Grid item xs={12} md={6} lg={4} key={budget._id}>
                        <BudgetCard budget={budget} />
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Budget</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="category"
                        label="Category"
                        type="text"
                        fullWidth
                        value={newBudget.category}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="limit"
                        label="Limit"
                        type="number"
                        fullWidth
                        value={newBudget.limit}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="period"
                        label="Period"
                        type="text"
                        fullWidth
                        value={newBudget.period}
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

export default Budgets;