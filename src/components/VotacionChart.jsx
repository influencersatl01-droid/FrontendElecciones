import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { fetchVotosPorDepartamento } from '../services/api';
import './VotacionChart.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

function VotacionChart({ departamento }) {
  const [votosData, setVotosData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('bar');

  useEffect(() => {
    if (departamento) {
      loadVotos();
    }
  }, [departamento]);

  const loadVotos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchVotosPorDepartamento(departamento.id_departamento);
      setVotosData(data);
    } catch (err) {
      setError('Error al cargar datos de votación');
      setVotosData(generateMockData());
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = () => {
    return {
      departamento: departamento.nombre_departamento,
      cortes: [
        {
          nombre: 'Corte 1',
          partidos: [
            { partido: 'Partido Liberal', votos: 15000, color: '#0088FE' },
            { partido: 'Partido Nacional', votos: 18000, color: '#00C49F' },
            { partido: 'Partido Libertad y Refundación', votos: 12000, color: '#FFBB28' },
            { partido: 'Partido Salvador de Honduras', votos: 8000, color: '#FF8042' },
          ]
        },
        {
          nombre: 'Corte 2',
          partidos: [
            { partido: 'Partido Liberal', votos: 16500, color: '#0088FE' },
            { partido: 'Partido Nacional', votos: 17000, color: '#00C49F' },
            { partido: 'Partido Libertad y Refundación', votos: 13500, color: '#FFBB28' },
            { partido: 'Partido Salvador de Honduras', votos: 9000, color: '#FF8042' },
          ]
        }
      ]
    };
  };

  if (loading) {
    return (
      <div className="chart-loading">
        <div className="spinner"></div>
        <p>Cargando datos de votación...</p>
      </div>
    );
  }

  const data = votosData || generateMockData();

  return (
    <div className="votacion-chart">
      <div className="chart-header">
        <h2>Resultados de Votación - {data.departamento}</h2>
        <div className="view-toggle">
          <button
            className={viewMode === 'bar' ? 'active' : ''}
            onClick={() => setViewMode('bar')}
          >
            Barras
          </button>
          <button
            className={viewMode === 'pie' ? 'active' : ''}
            onClick={() => setViewMode('pie')}
          >
            Circular
          </button>
        </div>
      </div>

      {error && (
        <div className="chart-warning">
          <p>{error}. Mostrando datos de ejemplo.</p>
        </div>
      )}

      <div className="charts-container">
        {data.cortes.map((corte, index) => (
          <div key={index} className="chart-section">
            <h3>{corte.nombre}</h3>

            {viewMode === 'bar' ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={corte.partidos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="partido" angle={-15} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="votos" fill="#667eea" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={corte.partidos}
                    dataKey="votos"
                    nameKey="partido"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={(entry) => `${entry.partido}: ${entry.votos.toLocaleString()}`}
                  >
                    {corte.partidos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}

            <div className="stats-table">
              <table>
                <thead>
                  <tr>
                    <th>Partido</th>
                    <th>Votos</th>
                    <th>Porcentaje</th>
                  </tr>
                </thead>
                <tbody>
                  {corte.partidos.map((partido, idx) => {
                    const total = corte.partidos.reduce((sum, p) => sum + p.votos, 0);
                    const porcentaje = ((partido.votos / total) * 100).toFixed(2);
                    return (
                      <tr key={idx}>
                        <td>
                          <span
                            className="color-indicator"
                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                          ></span>
                          {partido.partido}
                        </td>
                        <td>{partido.votos.toLocaleString()}</td>
                        <td>{porcentaje}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotacionChart;
