import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, LinearProgress } from '@mui/material';

function BudgetCard({ budget }) {
    const percentageSpent = (budget.spent / budget.limit) * 100;

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{budget.category}</Typography>
                <Typography variant="body1">Limit: ₹{budget.limit}</Typography>
                <Typography variant="body2">Spent: ₹{budget.spent}</Typography>
                <LinearProgress variant="determinate" value={percentageSpent} style={{ marginTop: '10px' }} />
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">Edit</Button>
                <Button size="small" color="secondary">Delete</Button>
            </CardActions>
        </Card>
    );
}

export default BudgetCard;