import React from 'react';
import './HomePageLernende.css';

const HomePageLernende: React.FC = () => {
    const today = new Date().toLocaleDateString('ch-CH', {
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return (
        <div className="home-container">

            <header className="home-header">
                <button className="menu-button">☰</button>
                <div className="name">Vorname Nachname</div>
                <div className="avatar">Avatar Profil</div>
            </header>

            <p className="date">{today}</p>

            <div className="card">
                <input className="input" placeholder="Value" />
            </div>

            <div className="grid-container">
                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="tile"></div>
                ))}
            </div>
        </div>
    );
};

export default HomePageLernende;
