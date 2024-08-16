const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Simulación de base de datos libros
let libros = [
    { id: 1, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez' },
    { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes' },
    { id: 3, titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry' },
    { id: 4, titulo: '1984', autor: 'George Orwell' },
    { id: 5, titulo: 'El Hobbit', autor: 'J.R.R. Tolkien' },
    { id: 6, titulo: 'Fahrenheit 451', autor: 'Ray Bradbury' },
    { id: 7, titulo: 'Orgullo y Prejuicio', autor: 'Jane Austen' },
    { id: 8, titulo: 'El Nombre de la Rosa', autor: 'Umberto Eco' },
    { id: 9, titulo: 'Crimen y Castigo', autor: 'Fiódor Dostoyevski' },
    { id: 10, titulo: 'La Odisea', autor: 'Homero' }
];

// Obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(libros);
});

// Obtener un libro por ID
app.get('/libros/:id', (req, res) => {
    const libro = libros.find(l => l.id === parseInt(req.params.id));
    if (!libro) return res.status(404).send('El libro no fue encontrado');
    res.json(libro);
});

// Añadir un nuevo libro
app.post('/libros', (req, res) => {
    const { titulo, autor } = req.body;

    // Validación título y autor no deben ser cadenas vacías
    if (!titulo || !autor) {
        return res.status(400).json({ mensaje: 'El título y el autor son campos obligatorios y no pueden estar vacíos.' });
    }

    const nuevoLibro = {
        id: libros.length + 1,
        titulo,
        autor
    };
    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
});

// Actualizar un libro existente
app.put('/libros/:id', (req, res) => {
    const libro = libros.find(l => l.id === parseInt(req.params.id));
    if (!libro) return res.status(404).send('El libro no fue encontrado');

    libro.titulo = req.body.titulo;
    libro.autor = req.body.autor;
    res.json(libro);
});

// Eliminar un libro
app.delete('/libros/:id', (req, res) => {
    const libro = libros.find(l => l.id === parseInt(req.params.id));
    if (!libro) return res.status(404).send('El libro no fue encontrado');

    const index = libros.indexOf(libro);
    libros.splice(index, 1);
    res.json(libro);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
