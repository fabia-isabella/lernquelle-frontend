import React from 'react';
import './HomePageLernende.css';
import {Box, Typography} from '@mui/material';

const HomePageLernende: React.FC = () => {
    const today = new Date().toLocaleDateString('ch-CH', {
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return (
        //TODO display correct name when user is implemented
        <div className="home-container">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0H24V4H12V0Z" fill="#343341"/>
                    <path d="M24 4H28V12H24V4Z" fill="#343341"/>
                    <path d="M12 4H24V16H20V20H16V16H12V4Z" fill="#FFE4C2"/>
                    <path d="M8 20H28V32H8V20Z" fill="#89CDFF"/>
                </svg>
                <Typography variant="h5" >Hallo, Vorname</Typography>
            </Box>
            <Typography className="date">{today}</Typography>
        </div>
    );
};

export default HomePageLernende;
