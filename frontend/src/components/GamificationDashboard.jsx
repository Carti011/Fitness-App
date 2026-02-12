import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, Trophy, TrendingUp, Users } from 'lucide-react';

const GamificationDashboard = ({ userId }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // In a real app, fetch from API
        // fetch(`http://localhost:8080/api/usuarios/${userId}`)
        //   .then(res => res.json())
        //   .then(data => setUserData(data));

        // Mock data for immediate preview while API connects
        fetch(`http://localhost:8080/api/usuarios/${userId}`)
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Failed to fetch");
            })
            .then(data => setUserData(data))
            .catch(err => {
                console.error(err);
                // Fallback mock
                setUserData({
                    xp: 1250,
                    nivel: 3,
                    ofensiva: 5,
                    ligaAtual: 'Prata',
                    clanId: null
                });
            });
    }, [userId]);

    const mockGraphData = [
        { name: 'Seg', xp: 400 },
        { name: 'Ter', xp: 300 },
        { name: 'Qua', xp: 550 },
        { name: 'Qui', xp: 450 },
        { name: 'Sex', xp: 700 },
        { name: 'Sab', xp: 200 },
        { name: 'Dom', xp: 600 },
    ];

    if (!userData) return <div className="p-4 text-center">Carregando estatísticas...</div>;

    return (
        <div className="gamification-dashboard" style={{ marginTop: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <TrendingUp color="var(--accent-color)" /> Painel de Evolução
            </h2>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="stat-card" style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>XP Total</span>
                        <Users size={20} color="#a0a0a0" />
                    </div>
                    <h3 style={{ fontSize: '1.8rem', margin: '0.5rem 0' }}>{userData.xp || 0}</h3>
                    <small style={{ color: '#a0a0a0' }}>Nível {userData.nivel || 1}</small>
                </div>

                <div className="stat-card" style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Ofensiva</span>
                        <Flame size={20} color="#FF5722" />
                    </div>
                    <h3 style={{ fontSize: '1.8rem', margin: '0.5rem 0' }}>{userData.ofensiva || 0} <small style={{ fontSize: '0.8rem' }}>dias</small></h3>
                    <small style={{ color: '#a0a0a0' }}>Não quebre o ritmo!</small>
                </div>

                <div className="stat-card" style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Liga</span>
                        <Trophy size={20} color="#FFD700" />
                    </div>
                    <h3 style={{ fontSize: '1.8rem', margin: '0.5rem 0' }}>{userData.ligaAtual || 'Bronze'}</h3>
                    <small style={{ color: '#a0a0a0' }}>Top 10 sobem!</small>
                </div>
            </div>

            <div className="chart-container" style={{ ...cardStyle, height: '300px' }}>
                <h4 style={{ marginBottom: '1rem' }}>XP da Semana</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockGraphData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} />
                        <Line type="monotone" dataKey="xp" stroke="var(--accent-color)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '1.5rem',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};

export default GamificationDashboard;
