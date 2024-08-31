import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import CategoryCard from '../components/CategoryCard';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', type: '' });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/categories', newCategory);
            setOpen(false);
            fetchCategories();
            setNewCategory({ name: '', type: '' });
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Categories
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Category
            </Button>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {categories.map(category => (
                    <Grid item xs={12} md={6} lg={4} key={category._id}>
                        <CategoryCard category={category} />
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={newCategory.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="type"
                        label="Type"
                        type="text"
                        fullWidth
                        value={newCategory.type}
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

export default Categories;