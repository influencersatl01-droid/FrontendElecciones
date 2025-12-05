# Sistema de Votación - Honduras

Aplicación web para visualizar resultados de votación por departamento en Honduras.

## Características

- Consulta de departamentos desde API REST
- Visualización de votos por departamento
- Gráficas de barras y circulares
- Datos organizados por corte, partido y cantidad de votos
- Interfaz responsive y moderna
- Tablas con estadísticas detalladas

## Requisitos

- Node.js 16 o superior
- API REST corriendo en `http://localhost:3000/api/departamentos`

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Build

```bash
npm run build
```

## Estructura de la API

### GET /api/departamentos

Retorna la lista de departamentos:

```json
[
  {
    "id_departamento": "01",
    "nombre_departamento": "ATLANTIDA"
  }
]
```

### GET /api/votos/:id_departamento

Retorna los votos por departamento (endpoint preparado para cuando esté disponible):

```json
{
  "departamento": "ATLANTIDA",
  "cortes": [
    {
      "nombre": "Corte 1",
      "partidos": [
        {
          "partido": "Partido Liberal",
          "votos": 15000,
          "color": "#0088FE"
        }
      ]
    }
  ]
}
```

## Funcionalidades

- **Selector de Departamento**: Dropdown con todos los departamentos disponibles
- **Gráficas Interactivas**: Visualización en barras o circular
- **Tabla de Estadísticas**: Muestra votos y porcentajes por partido
- **Datos por Corte**: Organización de resultados por corte electoral
- **Datos de Ejemplo**: Muestra datos mock si la API no está disponible

## Tecnologías

- React 18
- Vite
- Recharts (librería de gráficas)
- CSS modular
