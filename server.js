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
        prompt: `Eres un corrector de textos profesional. Tu única tarea es corregir ortografía, gramática y mejorar la redacción del siguiente texto. 

REGLAS ESTRICTAS:
- Devuelve SOLO el texto corregido, sin explicaciones
- No agregues saludos, despedidas ni comentarios
- No agregues texto nuevo que no estaba en el original
- Mantén el mismo idioma y tono del texto original
- Si el texto es muy corto, devuélvelo corregido tal cual

Texto a corregir:
${text}`,
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

app.get('/ping', (req, res) => {
  res.json({ message: 'Servidor funcionando' });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
}).on('error', (err) => {
  console.error('Error al iniciar servidor:', err);
});
process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err);
});