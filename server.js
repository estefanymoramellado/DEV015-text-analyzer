
const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 3000;

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5-coder:7b';

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.options('/{*path}', cors());

app.get('/ping', (_req, res) => {
  res.json({ ok: true, message: 'Servidor funcionando ✅', model: OLLAMA_MODEL });
});


app.post('/mejorar', async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'El campo "text" es obligatorio.' });
  }

  const prompt = `Eres un corrector de textos profesional. Tu única tarea es corregir ortografía, gramática y mejorar la redacción del siguiente texto.

REGLAS ESTRICTAS:
- Devuelve SOLO el texto corregido, sin explicaciones
- No agregues saludos, despedidas ni comentarios
- No agregues texto nuevo que no estaba en el original
- Mantén el mismo idioma y tono del texto original
- Si el texto es muy corto, devuélvelo corregido tal cual

Texto a corregir:
${text}`;

  try {
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: false
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Ollama respondió con ${response.status}: ${errText}`);
    }

    const data = await response.json();
    res.json({ result: data.response?.trim() || '' });

  } catch (error) {
    console.error('❌ Error con Ollama:', error.message);
    res.status(500).json({ error: `Error al procesar con IA local: ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`   Ollama: ${OLLAMA_URL}  |  Modelo: ${OLLAMA_MODEL}`);
  console.log(`   Health check: http://localhost:${PORT}/ping`);
});

process.on('uncaughtException', (err) => {
  console.error('💥 Error no capturado:', err);
});
