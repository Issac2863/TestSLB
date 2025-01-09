// Importamos las librerías necesarias
import express, { Request, Response } from 'express';
const { Pool } = require('pg');
import bodyParser from 'body-parser';
import cors from 'cors';


// Configuración del servidor
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pozos_db',
  password: 'unsc',
  port: 5432,
});

// Tipos de datos para el pozo
interface Pozo {
  id?: number;
  nombre: string;
  ubicacion: string;
  produccionDiaria: number;
  estado: 'activo' | 'inactivo';
}

// Validación del cuerpo de la solicitud
const validatePozo = (pozo: any): pozo is Pozo => {
  return (
    typeof pozo.nombre === 'string' &&
    typeof pozo.ubicacion === 'string' &&
    typeof pozo.produccionDiaria === 'number' &&
    (pozo.estado === 'activo' || pozo.estado === 'inactivo')
  );
};

// Endpoint: GET /pozos
app.get('/pozos', async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await pool.query('SELECT * FROM pozos');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener los pozos' });
  }
});

// Endpoint: POST /pozos
app.post('/pozos', async (req: Request, res: Response): Promise<Response> => {
  const pozo: Pozo = req.body;

  // Validación del cuerpo de la solicitud
  if (!validatePozo(pozo)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO pozos (nombre, ubicacion, produccion_diaria, estado) VALUES ($1, $2, $3, $4) RETURNING *',
      [pozo.nombre, pozo.ubicacion, pozo.produccionDiaria, pozo.estado]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al crear el pozo' });
  }

});


// Endpoint: PATCH /pozos/:id
app.patch('/pozos/:id', async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { estado } = req.body;

  if (estado !== 'activo' && estado !== 'inactivo') {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  try {
    const result = await pool.query(
      'UPDATE pozos SET estado = $1 WHERE id = $2 RETURNING *',
      [estado, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pozo no encontrado' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar el estado del pozo' });
  }

  // Asegura un retorno explícito en todos los caminos
  return res.status(500).json({ error: 'Error desconocido' });
});


// Inicialización del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
