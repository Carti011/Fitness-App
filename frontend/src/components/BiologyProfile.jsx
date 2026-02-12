import React, { useState, useEffect } from 'react';
import { Activity, Heart, Scale, Ruler } from 'lucide-react';

const BiologyProfile = ({ userId }) => {
    const [formData, setFormData] = useState({
        peso: '',
        altura: '',
        dataNascimento: '',
        sexo: 'MASCULINO',
        nivelAtividade: 'MODERADO',
        percentualGordura: ''
    });
    const [metabolismo, setMetabolismo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/api/usuarios/${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    setFormData({
                        peso: data.peso || '',
                        altura: data.altura || '',
                        dataNascimento: data.dataNascimento || '',
                        sexo: data.sexo || 'MASCULINO',
                        nivelAtividade: data.nivelAtividade || 'MODERADO',
                        percentualGordura: data.percentualGordura || ''
                    });
                    fetchMetabolismo();
                }
            })
            .catch(console.error);
    }, [userId]);

    const fetchMetabolismo = () => {
        fetch(`http://localhost:8080/api/usuarios/${userId}/metabolismo`)
            .then(res => res.json())
            .then(data => setMetabolismo(data))
            .catch(console.error);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(`http://localhost:8080/api/usuarios/${userId}/biometria`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    setMessage('Perfil atualizado com sucesso!');
                    fetchMetabolismo();
                    setTimeout(() => setMessage(''), 3000);
                } else {
                    setMessage('Erro ao atualizar.');
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="biology-profile" style={{ marginTop: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Activity color="var(--accent-color)" /> Perfil Biológico
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <form onSubmit={handleSubmit} style={cardStyle}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Data de Nascimento</label>
                        <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} style={inputStyle} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>Peso (kg)</label>
                            <div style={inputWrapperStyle}>
                                <Scale size={16} color="#888" />
                                <input type="number" name="peso" value={formData.peso} onChange={handleChange} style={inputStyle} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Altura (cm)</label>
                            <div style={inputWrapperStyle}>
                                <Ruler size={16} color="#888" />
                                <input type="number" name="altura" value={formData.altura} onChange={handleChange} style={inputStyle} required />
                            </div>
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>BF% (Opcional - para Katch-McArdle)</label>
                        <input type="number" name="percentualGordura" value={formData.percentualGordura} onChange={handleChange} style={inputStyle} placeholder="Ex: 15.5" />
                    </div>

                    <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Nível de Atividade</label>
                        <select name="nivelAtividade" value={formData.nivelAtividade} onChange={handleChange} style={inputStyle}>
                            <option value="SEDENTARIO">Sedentário (1.2)</option>
                            <option value="LEVE">Leve (1.375)</option>
                            <option value="MODERADO">Moderado (1.55)</option>
                            <option value="MUITO_ATIVO">Muito Ativo (1.725)</option>
                            <option value="EXTREMAMENTE_ATIVO">Extremamente Ativo (1.9)</option>
                        </select>
                    </div>

                    <button type="submit" disabled={loading} style={buttonStyle}>
                        {loading ? 'Salvando...' : 'Atualizar Dados'}
                    </button>
                    {message && <p style={{ marginTop: '0.5rem', color: '#4caf50' }}>{message}</p>}
                </form>

                <div className="metabolism-results">
                    {metabolismo && (
                        <>
                            <div style={{ ...cardStyle, marginBottom: '1rem', borderLeft: '4px solid var(--accent-color)' }}>
                                <h3 style={{ marginTop: 0, color: '#aaa' }}>Taxa Metabólica Basal (TMB)</h3>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{Math.round(metabolismo.tmb)} <small style={{ fontSize: '1rem' }}>kcal</small></div>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>Custo para manter seu corpo vivo em repouso.</p>
                            </div>

                            <div style={{ ...cardStyle, borderLeft: '4px solid #FF5722' }}>
                                <h3 style={{ marginTop: 0, color: '#aaa' }}>Gasto Energético Total (GET)</h3>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{Math.round(metabolismo.get)} <small style={{ fontSize: '1rem' }}>kcal</small></div>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>O que você gasta no dia-a-dia real.</p>
                            </div>
                        </>
                    )}
                    {!metabolismo && <p>Preencha os dados e salve para ver seu metabolismo.</p>}
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

export default BiologyProfile;
