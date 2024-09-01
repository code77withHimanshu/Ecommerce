import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'http://localhost:5000/change-password',
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : 'Error changing password');
        } finally {
            // Reset fields after handling response
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
            <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
                Change Password
            </Typography>
            <form onSubmit={handleChangePassword}>
                <TextField
                    label="Old Password"
                    type="password"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                    label="Confirm New Password"
                    type="password"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Change Password
                </Button>
                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="success">{success}</Typography>}
            </form>
        </Box>
    );
};

export default ChangePassword;
