const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.options('/mejorar', cors()); 

app.post('/mejorar', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Texto vacío' });
  }

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen2.5-coder:7b',
        prompt: `Mejora el siguiente texto manteniendo el mismo idioma y tono. Devuelve solo el texto mejorado:\n\n${text}`,
        stream: false
      })
    });

    const data = await response.json();
    res.json({ result: data.response });

  } catch (error) {
    console.error('Error con Ollama:', error);
    res.status(500).json({ error: 'Error al procesar con IA local' });
  }
});

app.use(express.static('src'));

// Ruta de prueba
app.get('/ping', (req, res) => {
  res.json({ message: 'Servidor funcionando' });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});