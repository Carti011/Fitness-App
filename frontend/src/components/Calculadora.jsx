import React, { useState } from 'react';
import axios from 'axios';
import { Activity, Flame, Trophy, Info } from 'lucide-react';

const Calculadora = () => {
  const [formData, setFormData] = useState({
    peso: '',
    altura: '',
    idade: '',
    sexo: 'MASCULINO',
    nivelAtividade: 'SEDENTARIO'
  });

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calcular = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8080/api/calculadora', {
        peso: parseFloat(formData.peso),
        altura: parseFloat(formData.altura),
        idade: parseInt(formData.idade),
        sexo: formData.sexo,
        nivelAtividade: formData.nivelAtividade
      });
      setResultado(response.data);
    } catch (err) {
      setError('Erro ao calcular. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Activity color="var(--accent-color)" size={32} />
        <h2>Calculadora Metabólica</h2>
      </div>

      <form onSubmit={calcular}>
        <div className="input-group">
          <label>Peso (kg)</label>
          <input
            type="number"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            placeholder="Ex: 80.5"
            required
            step="0.1"
          />
        </div>

        <div className="input-group">
          <label>Altura (cm)</label>
          <input
            type="number"
            name="altura"
            value={formData.altura}
            onChange={handleChange}
            placeholder="Ex: 180"
            required
          />
        </div>

        <div className="input-group">
          <label>Idade (anos)</label>
          <input
            type="number"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
            placeholder="Ex: 25"
            required
          />
        </div>

        <div className="input-group">
          <label>Sexo Biológico</label>
          <select name="sexo" value={formData.sexo} onChange={handleChange}>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
          </select>
        </div>

        <div className="input-group">
          <label>Nível de Atividade</label>
          <select name="nivelAtividade" value={formData.nivelAtividade} onChange={handleChange}>
            <option value="SEDENTARIO">Sedentário (Escritório, pouco exercício)</option>
            <option value="LEVE">Levemente Ativo (Exercício 1-3x/sem)</option>
            <option value="MODERADO">Moderadamente Ativo (Exercício 3-5x/sem)</option>
            <option value="MUITO_ATIVO">Muito Ativo (Exercício 6-7x/sem)</option>
            <option value="EXTREMAMENTE_ATIVO">Extremamente Ativo (Atleta/Trabalho pesado)</option>
          </select>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Calculando...' : 'Calcular Metas'}
        </button>
      </form>

      {error && (
        <div style={{ marginTop: '1rem', color: 'var(--danger-color)' }}>
          {error}
        </div>
      )}

      {resultado && (
        <div style={{ marginTop: '2rem', animation: 'fadeIn 0.5s ease' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#252525', borderRadius: '12px', marginBottom: '1rem', borderLeft: '4px solid var(--accent-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.9rem', color: '#a0a0a0' }}>Taxa Metabólica Basal (TMB)</span>
                <h3 style={{ fontSize: '1.5rem', color: 'white' }}>{Math.round(resultado.tmb)} kcal</h3>
              </div>
              <Flame color="#ffaa00" size={24} />
            </div>
          </div>

          <div style={{ padding: '1.5rem', backgroundColor: '#252525', borderRadius: '12px', borderLeft: '4px solid #a066ff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.9rem', color: '#a0a0a0' }}>Gasto Energético Total (GET)</span>
                <h3 style={{ fontSize: '1.5rem', color: 'white' }}>{Math.round(resultado.get)} kcal</h3>
              </div>
              <Trophy color="#a066ff" size={24} />
            </div>
            <p style={{ fontSize: '0.8rem', color: '#a0a0a0', marginTop: '0.5rem' }}>
              <Info size={12} style={{ display: 'inline', marginRight: '4px' }}/>
              Para manter seu peso, consuma isso.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculadora;
