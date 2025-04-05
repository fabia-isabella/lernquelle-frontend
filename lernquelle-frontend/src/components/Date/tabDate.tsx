import React from 'react';
import Table from './Table';

const App: React.FC = () => {
    const columns = [
        { path: "Vorname", name: "Vorname" },
        { path: "Nachname", name: "Nachname" },
        { path: "Date", name: "Date" },
        { path: "DueTo", name: "Due to" },
        { path: "Description", name: "Description" },
    ];

    const data = [
        {
            Vorname: "Friedrich",
            Nachname: "Dürenmatt",
            Date: "2025-04-10",
            DueTo: "2025-04-12",
            Description: "Code Review",
        },
        {
            Vorname: "Michael",
            Nachname: "Jackson",
            Date: "2025-04-15",
            DueTo: "2025-04-16",
            Description: "Vortrag lernen für IPA",
        },
    ];

    return (
        <div className="page-container">
            <h2>Termine</h2>
            <Table id="Vorname" columns={columns} data={data} />
        </div>
    );
};

export default App;
