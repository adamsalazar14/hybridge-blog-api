const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());



app.post('/api/authors', async (req, res) => { //[cite: 1]
    const { name } = req.body; //[cite: 1]
    const author = await db.Author.create({ name }); //[cite: 1]
    res.status(201).json(author); //[cite: 1]
});

app.post('/api/posts', async (req, res) => {
    try {
        const { title, content, authorId } = req.body; 
        const post = await db.Post.create({ title, content, authorId });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la publicación' });
    }
});

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await db.Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
});

app.get('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await db.Post.findByPk(id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Publicación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la publicación' });
    }
});

app.put('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await db.Post.findByPk(id);
        
        if (post) {
            await post.update({ title, content });
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Publicación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la publicación' });
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await db.Post.findByPk(id);
        
        if (post) {
            await post.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Publicación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la publicación' });
    }
});

const PORT = 3000;

db.sequelize.sync({ force: true }).then(() => {
    console.log('Base de datos sincronizada.');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});