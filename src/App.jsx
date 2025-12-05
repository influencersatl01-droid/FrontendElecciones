import { useState, useEffect } from 'react';
import { fetchDepartamentos } from './services/api';
import DepartamentoSelector from './components/DepartamentoSelector';
import VotacionChart from './components/VotacionChart';
import './App.css';

function App() {
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDepartamentos();
  }, []);

  const loadDepartamentos = async () => {
    try {
      setLoading(true);
      const data = await fetchDepartamentos();
      setDepartamentos(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar departamentos. Verifica que la API esté corriendo en http://localhost:3000');
    } finally {
      setLoading(false);
    }
  };

  const handleDepartamentoChange = (departamento) => {
    setSelectedDepartamento(departamento);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistema de Votación - Honduras</h1>
        <p>Visualización de votos por departamento</p>
      </header>

      <main className="app-content">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Cargando departamentos...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadDepartamentos} className="retry-button">
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <DepartamentoSelector
              departamentos={departamentos}
              selectedDepartamento={selectedDepartamento}
              onDepartamentoChange={handleDepartamentoChange}
            />

            {selectedDepartamento && (
              <VotacionChart departamento={selectedDepartamento} />
            )}

            {!selectedDepartamento && (
              <div className="placeholder">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="100" cy="100" r="80" stroke="#e0e0e0" strokeWidth="4" />
                  <path
                    d="M100 40 L120 90 L170 90 L130 120 L145 170 L100 140 L55 170 L70 120 L30 90 L80 90 Z"
                    fill="#e0e0e0"
                  />
                </svg>
                <p>Selecciona un departamento para ver las gráficas de votación</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
