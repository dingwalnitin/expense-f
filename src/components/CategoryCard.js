import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

function CategoryCard({ category }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{category.name}</Typography>
                <Typography variant="body1">Type: {category.type}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">Edit</Button>
                <Button size="small" color="secondary">Delete</Button>
            </CardActions>
        </Card>
    );
}

export default CategoryCard;