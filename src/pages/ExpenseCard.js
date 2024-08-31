import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

function ExpenseCard({ expense, onDelete }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{expense.category}</Typography>
                <Typography variant="body1">Amount: ₹{expense.amount}</Typography>
                <Typography variant="body2">Budget: {expense.budget}</Typography>
                <Typography variant="body2">Date: {new Date(expense.date).toLocaleDateString()}</Typography>
                <Typography variant="body2">Description: {expense.description}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">Edit</Button>
                <Button size="small" color="secondary" onClick={() => onDelete(expense._id)}>Delete</Button>
            </CardActions>
        </Card>
    );
}

export default ExpenseCard;