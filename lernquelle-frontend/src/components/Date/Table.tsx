import React from 'react';
import './Table.css';

type Column = {
    path: string;
    name: string;
};

type RowData = {
    [key: string]: string;
};

interface TableProps {
    id: string;
    columns: Column[];
    data: RowData[];
}

const Table: React.FC<TableProps> = ({ id, columns, data }) => (
    <table className="custom-table">
        <thead>
        <tr>
            {columns.map(({ path, name }) => (
                <th key={path}>{name}</th>
            ))}
        </tr>
        </thead>
        <tbody>
        {data.map((rowData) => (
            <tr key={rowData[id]}>
                {columns.map(({ path }) => (
                    <td key={path}>{rowData[path]}</td>
                ))}
            </tr>
        ))}
        </tbody>
    </table>
);

export default Table;
