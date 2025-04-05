import React from 'react';
import Table from './Table';
import {Box, Card, CardContent, Typography} from '@mui/material';

const App: React.FC = () => {
    //TODO add api endpoint calls
    const columns = [
        { path: "title", name: "Titel"},
        { path: "Description", name: "Beschreibung" },
        { path: "DueTo", name: "Fällig am" },
    ];

    const data = [
        {
            title: "Austausch Ausbildungscoach",
            DueTo: "2025-04-12",
            Description: "Besprechung Lernziele Ausbildung",
        },
        {
            title: "Blocker Reflexion",
            DueTo: "2025-04-16",
            Description: "Reflexion Informatikprüfung",
        },
    ];

    return (
            <Card sx={{width: '95%', borderTop: '1px solid black',
                borderLeft: '1px solid black',
                borderBottom: '5px solid black',
                borderRight: '5px solid black', padding: '0.25rem' }}>
                <Typography variant='h6'>Termine</Typography>
                <CardContent>
                    <Box>
                        <Typography></Typography>
                    </Box>
                </CardContent>
            </Card>
    );
};

export default App;
