import React from 'react';
import { Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function Home() {
    const { user } = useAuth();

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Welcome to Expense Tracker, {user ? user.name : 'Guest'}
            </Typography>
            <Typography variant="body1">
                Manage your expenses, set budgets, and track your spending efficiently.
            </Typography>
        </div>
    );
}

export default Home;