CREATE TABLE IF NOT EXISTS pozos (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    ubicacion TEXT NOT NULL,
    produccion_diaria NUMERIC NOT NULL,
    estado TEXT CHECK (estado IN ('activo', 'inactivo')) NOT NULL
);

INSERT INTO pozos (nombre, ubicacion, produccion_diaria, estado)
VALUES
('Pozo A', 'Zona 1', 1000, 'activo'),
('Pozo B', 'Zona 2', 500, 'inactivo');