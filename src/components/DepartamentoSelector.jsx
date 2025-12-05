import './DepartamentoSelector.css';

function DepartamentoSelector({ departamentos, selectedDepartamento, onDepartamentoChange }) {
  const handleChange = (e) => {
    const selected = departamentos.find(
      (dept) => dept.id_departamento === e.target.value
    );
    onDepartamentoChange(selected);
  };

  return (
    <div className="departamento-selector">
      <label htmlFor="departamento">Selecciona un Departamento:</label>
      <select
        id="departamento"
        value={selectedDepartamento?.id_departamento || ''}
        onChange={handleChange}
        className="selector"
      >
        <option value="">-- Selecciona un departamento --</option>
        {departamentos.map((dept) => (
          <option key={dept.id_departamento} value={dept.id_departamento}>
            {dept.nombre_departamento}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DepartamentoSelector;
