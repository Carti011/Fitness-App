import { useState } from 'react'
import Calculadora from './components/Calculadora'

function App() {
  return (
    <div className="App" style={{ padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(to right, #ffffff, #a0a0a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          FITNESS MVP
        </h1>
        <p style={{ color: 'var(--accent-color)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Evolução & Performance
        </p>
      </header>

      <main>
        <Calculadora />
      </main>
    </div>
  )
}

export default App
