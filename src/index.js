import analyzer from './analyzer.js';

document.querySelector('.btn-red.btn-ia').addEventListener('click', async () => {
  const text = textarea.value;
  if (!text.trim()) return;

  try {
    const res = await fetch('http://localhost:3000/mejorar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    textarea.value = data.result;
    updateMetrics();
  } catch (error) {
    alert('Error al conectar con el servidor local');
  }
});

const textarea = document.querySelector('textarea[name="user-input"]');

const charCountEl = document.querySelector('li[data-caracteres="total"] button');
const charNoSpaceEl = document.querySelector('li[data-caracteres="sin-espacios"] button');
const wordCountEl = document.querySelector('li[data-caracteres="palabras"] button');
const numberCountEl = document.querySelector('li[data-caracteres="numeros"] button');
const avgWordLengthEl = document.querySelector('li[data-caracteres="promedio"] button');
const paragraphCountEl = document.querySelector('li[data-caracteres="parrafos"] button');
const sentenceCountEl = document.querySelector('li[data-caracteres="oraciones"] button');
const repeatCountEl = document.querySelector('li[data-caracteres="repetidas"] button');
const readingTimeEl = document.querySelector('li[data-caracteres="tiempo"] button');
const readabilityEl = document.querySelector('li[data-caracteres="legibilidad"] button');
const fleschGradeEl = document.querySelector('li[data-caracteres="flesch"] button');
const idiomaEl = document.querySelector('li[data-caracteres="idioma"] button');

const updateMetrics = () => {
  const text = textarea.value;
  
  charCountEl.textContent = `Caracteres: ${analyzer.getCharacterCount(text)}`;
  charNoSpaceEl.textContent = `Caracteres sin espacios: ${analyzer.getCharacterCountExcludingSpaces(text)}`;
  wordCountEl.textContent = `Palabras: ${analyzer.getWordCount(text)}`;
  numberCountEl.textContent = `Números: ${analyzer.getNumberCount(text)}`;
  avgWordLengthEl.textContent = `Promedio longitud: ${analyzer.getAverageWordLength(text).toFixed(2)}`;
  paragraphCountEl.textContent = `Párrafos: ${analyzer.getParagraphCount(text)}`;
  sentenceCountEl.textContent = `Oraciones: ${analyzer.getSentenceCount(text)}`;

  const totalWords = analyzer.getWordCount(text);
  const repeated = analyzer.getRepeatCount(text);
  const unique = totalWords > 0 ? totalWords - repeated : 0;
  const uniquePercent = totalWords > 0 ? Math.round((unique / totalWords) * 100) : 0;
  const repeatedPercent = totalWords > 0 ? Math.round((repeated / totalWords) * 100) : 0;

  repeatCountEl.innerHTML = totalWords === 0 ? `
    <span style="font-size:0.85rem; color:#999;">Palabras repetidas: —</span>
  ` : `
    <div style="margin-bottom:8px; font-size:0.85rem; display:flex; justify-content:space-between;">
      <span>Palabras únicas: <strong>${unique}</strong></span>
      <span>Repetidas: <strong>${repeated}</strong></span>
    </div>
    <div style="background:#cfc6b0; border-radius:6px; overflow:hidden; height:22px; width:100%; margin-bottom:6px;">
      <div style="width:${uniquePercent}%; height:100%; background:linear-gradient(90deg,#7aadba,#9cc6d6); border-radius:6px; transition:width 0.4s ease;"></div>
    </div>
    <div style="background:#cfc6b0; border-radius:6px; overflow:hidden; height:22px; width:100%;">
      <div style="width:${repeatedPercent}%; height:100%; background:linear-gradient(90deg,#2d6e7e,#4a9aad); border-radius:6px; transition:width 0.4s ease;"></div>
    </div>
    <div style="font-size:0.75rem; color:#666; margin-top:6px; display:flex; justify-content:space-between;">
      <span>Únicas ${uniquePercent}%</span>
      <span>Repetidas ${repeatedPercent}%</span>
    </div>
  `;

  readingTimeEl.textContent = `Tiempo de lectura: ${analyzer.getReadingTime(text)}`;
  
  const result = analyzer.getReadability(text);
  readabilityEl.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
      <span style="font-family:'Asul',serif; font-size:0.95rem;">Legibilidad</span>
      <span style="font-family:'Asul',serif; font-size:1.6rem; font-weight:700;">${result.score}%</span>
    </div>
    <div style="background:#cfc6b0; border-radius:10px; overflow:hidden; height:14px; margin-bottom:10px;">
      <div style="
        width:${result.score}%;
        height:100%;
        border-radius:10px;
        background:${result.score >= 70 ? 'linear-gradient(90deg,#5db85b,#90e887)' : result.score >= 50 ? 'linear-gradient(90deg,#8a6dd3,#c3b1f4)' : 'linear-gradient(90deg,#d36d6d,#f4b1b1)'};
        transition:width 0.4s ease;
      "></div>
    </div>
    <span style="font-size:0.9rem; display:flex; align-items:center; gap:8px;">
      Nivel ${result.label}
      <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${result.score >= 70 ? '#3db85b' : result.score >= 50 ? '#e6a817' : '#d93b3b'};"></span>
    </span>
  `;
  
  if (fleschGradeEl) {
    fleschGradeEl.textContent = `Grado Flesch: ${analyzer.getFleschKincaidGrade(text)}`;
  }

  idiomaEl.textContent = `Idioma: ${analyzer.getLanguage(text)}`;
};

textarea.addEventListener('input', updateMetrics);

document.getElementById('reset-button').addEventListener('click', () => {
  textarea.value = '';
  updateMetrics();
});