const API_BASE_URL = 'http://localhost:3000/api';

export const fetchDepartamentos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/departamentos`);
    if (!response.ok) {
      throw new Error('Error al obtener departamentos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching departamentos:', error);
    throw error;
  }
};

export const fetchVotosPorDepartamento = async (idDepartamento) => {
  try {
    const response = await fetch(`${API_BASE_URL}/votos/${idDepartamento}`);
    if (!response.ok) {
      throw new Error('Error al obtener votos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching votos:', error);
    throw error;
  }
};
