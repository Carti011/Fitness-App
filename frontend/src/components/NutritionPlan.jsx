import React, { useState, useEffect } from 'react';
import { Apple, Leaf, AlertCircle, Utensils } from 'lucide-react';

const NutritionPlan = ({ userId }) => {
    const [plano, setPlano] = useState(null);
    const [loading, setLoading] = useState(true);
    const [preferences, setPreferences] = useState({
        objetivoNutricional: 'MANTER',
        dietaPreferencias: '',
        alergias: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchPlano();
    }, [userId]);

    const fetchPlano = () => {
        setLoading(true);
        // Fetch user data first to get current preferences
        fetch(`http://localhost:8080/api/usuarios/${userId}`)
            .then(res => res.json())
            .then(user => {
                setPreferences({
                    objetivoNutricional: user.objetivoNutricional || 'MANTER',
                    dietaPreferencias: user.dietaPreferencias || '',
                    alergias: user.alergias || ''
                });
                // Then fetch plan
                return fetch(`http://localhost:8080/api/nutricao/plano/${userId}`);
            })
            .then(res => res.json())
            .then(data => setPlano(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    const updatePreferences = (e) => {
        e.preventDefault();
        setLoading(true);
        // We need to fetch current user data first to not overwrite other fields
        // Ideally backend should support PATCH or we just send what we have + other fields if we had them stored
        // For MVP, lets assume we can just send these fields to the biometria endpoint if we implemented it right
        // BUT biometria endpoint expects other fields too... 
        // Let's fetch user, merge and update.

        fetch(`http://localhost:8080/api/usuarios/${userId}`)
            .then(res => res.json())
            .then(user => {
                const updatedUser = {
                    ...user,
                    ...preferences
                };
                return fetch(`http://localhost:8080/api/usuarios/${userId}/biometria`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedUser)
                });
            })
            .then(res => {
                if (res.ok) {
                    setMessage('Preferências atualizadas!');
                    setTimeout(() => setMessage(''), 3000);
                    fetchPlano(); // Refresh plan
                }
            })
            .catch(err => setMessage('Erro ao atualizar.'))
            .finally(() => setLoading(false));
    };

    const handleChange = (e) => {
        setPreferences({ ...preferences, [e.target.name]: e.target.value });
    };

    if (loading && !plano) return <div className="p-4 text-center">Carregando plano nutricional...</div>;

    return (
        <div className="nutrition-plan" style={{ marginTop: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Apple color="var(--accent-color)" /> Plano Nutricional Inteligente
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Preferences Form */}
                <form onSubmit={updatePreferences} style={cardStyle}>
                    <h3 style={{ marginBottom: '1rem', color: '#a0a0a0' }}>Suas Configurações</h3>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Objetivo</label>
                        <select name="objetivoNutricional" value={preferences.objetivoNutricional} onChange={handleChange} style={inputStyle}>
                            <option value="PERDA_PESO">Perder Peso (-500kcal)</option>
                            <option value="MANTER">Manter Peso</option>
                            <option value="GANHO_MASSA">Ganhar Massa (+300kcal)</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Preferências (Ex: Vegetariano)</label>
                        <div style={inputWrapperStyle}>
                            <Leaf size={16} color="#888" />
                            <input type="text" name="dietaPreferencias" value={preferences.dietaPreferencias} onChange={handleChange} style={inputStyle} placeholder="Opcional" />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Alergias (Ex: Amendoim)</label>
                        <div style={inputWrapperStyle}>
                            <AlertCircle size={16} color="#888" />
                            <input type="text" name="alergias" value={preferences.alergias} onChange={handleChange} style={inputStyle} placeholder="Opcional" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} style={buttonStyle}>
                        {loading ? 'Calculando...' : 'Gerar Novo Plano'}
                    </button>
                    {message && <p style={{ marginTop: '0.5rem', color: '#4caf50' }}>{message}</p>}
                </form>

                {/* Results */}
                <div className="plan-results">
                    {plano && (
                        <>
                            <div style={{ ...cardStyle, marginBottom: '1rem', borderLeft: '4px solid var(--accent-color)' }}>
                                <h3 style={{ marginTop: 0, color: '#aaa' }}>Calorias Diárias</h3>
                                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff' }}>
                                    {plano.caloriasAlvo} <small style={{ fontSize: '1rem' }}>kcal</small>
                                </div>
                                <p style={{ color: '#666', fontSize: '0.9rem' }}>{plano.objetivo}</p>
                            </div>

                            <div style={{ ...cardStyle, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF5722' }}>{plano.proteinaG}g</div>
                                    <small style={{ color: '#aaa' }}>Proteína</small>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFC107' }}>{plano.carboG}g</div>
                                    <small style={{ color: '#aaa' }}>Carbo</small>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#03A9F4' }}>{plano.gorduraG}g</div>
                                    <small style={{ color: '#aaa' }}>Gordura</small>
                                </div>
                            </div>

                            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0' }}>
                                    <Utensils size={18} /> Sugestão do Chef (IA)
                                </h4>
                                <p style={{ color: '#a0a0a0', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                    "Foque em alimentos ricos em proteínas magras. Evite processados. Seus {plano.caloriasAlvo} kcal serão melhor aproveitados com comida de verdade!"
                                </p>
                            </div>
                        </>
                    )}
                </div>
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
    height: 'fit-content'
};

const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(0,0,0,0.2)',
    color: '#fff',
    marginTop: '0.2rem'
};

const inputWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '8px',
    paddingLeft: '0.5rem',
    border: '1px solid rgba(255,255,255,0.2)',
    marginTop: '0.2rem'
};

const buttonStyle = {
    width: '100%',
    padding: '1rem',
    marginTop: '1.5rem',
    borderRadius: '8px',
    border: 'none',
    background: 'var(--accent-color)',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s'
};

export default NutritionPlan;
