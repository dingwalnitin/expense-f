import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
    const { user } = useAuth();

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            <Card>
                <CardContent>
                    <Typography variant="h6">User Information</Typography>
                    <Typography variant="body1">Name: {user ? user.name : 'Not available'}</Typography>
                    <Typography variant="body1">Email: {user ? user.email : 'Not available'}</Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Profile;