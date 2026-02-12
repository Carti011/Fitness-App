import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, User, Dumbbell, Apple } from 'lucide-react';
import GamificationDashboard from './components/GamificationDashboard';
import BiologyProfile from './components/BiologyProfile';
import NutritionPlan from './components/NutritionPlan';

function NavBar() {
  const location = useLocation();

  return (
    <nav style={navStyle}>
      <Link to="/" style={getLinkStyle(location.pathname === '/')}>
        <Home size={20} /> Dashboard
      </Link>
      <Link to="/profile" style={getLinkStyle(location.pathname === '/profile')}>
        <User size={20} /> Perfil
      </Link>
      <Link to="/nutricao" style={getLinkStyle(location.pathname === '/nutricao')}>
        <Apple size={20} /> Dieta
      </Link>
    </nav>
  );
}

function App() {
  // Hardcoded for MVP proof of concept
  const userId = 1;

  return (
    <Router>
      <div className="App" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(to right, #ffffff, #a0a0a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
            FITNESS MVP
          </h1>
          <p style={{ color: 'var(--accent-color)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            Evolução & Performance
          </p>
        </header>

        <NavBar />

        <main style={{ minHeight: '400px' }}>
          <Routes>
            <Route path="/" element={<GamificationDashboard userId={userId} />} />
            <Route path="/profile" element={<BiologyProfile userId={userId} />} />
            <Route path="/nutricao" element={<NutritionPlan userId={userId} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginBottom: '2rem',
  background: 'rgba(255,255,255,0.05)',
  padding: '0.5rem',
  borderRadius: '50px',
  width: 'fit-content',
  margin: '0 auto 2rem auto',
  backdropFilter: 'blur(10px)'
};

const getLinkStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.7rem 1.5rem',
  borderRadius: '25px',
  textDecoration: 'none',
  color: isActive ? '#000' : '#fff',
  background: isActive ? 'var(--accent-color)' : 'transparent',
  fontWeight: isActive ? 'bold' : 'normal',
  transition: 'all 0.3s ease'
});

export default App
