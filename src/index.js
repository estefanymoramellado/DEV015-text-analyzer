import analyzer from './analyzer.js';

const textarea        = document.querySelector('textarea[name="user-input"]');
const charCountEl     = document.querySelector('li[data-caracteres="total"] button');
const charNoSpaceEl   = document.querySelector('li[data-caracteres="sin-espacios"] button');
const wordCountEl     = document.querySelector('li[data-caracteres="palabras"] button');
const numberCountEl   = document.querySelector('li[data-caracteres="numeros"] button');
const avgWordLengthEl = document.querySelector('li[data-caracteres="promedio"] button');
const paragraphCountEl= document.querySelector('li[data-caracteres="parrafos"] button');
const sentenceCountEl = document.querySelector('li[data-caracteres="oraciones"] button');
const repeatCountEl   = document.querySelector('li[data-caracteres="repetidas"] button');
const readingTimeEl   = document.querySelector('li[data-caracteres="tiempo"] button');
const readabilityEl   = document.querySelector('li[data-caracteres="legibilidad"] button');
const fleschGradeEl   = document.querySelector('li[data-caracteres="flesch"] button');
const idiomaEl        = document.querySelector('li[data-caracteres="idioma"] button');

const btnAnalizar = document.getElementById('btn-analizar');
const btnIA       = document.getElementById('btn-ia');
const btnExportar = document.getElementById('btn-exportar');
const resetButton = document.getElementById('reset-button');

const modalIA       = document.getElementById('modal-ia');
const serverUrlInput= document.getElementById('server-url');
const modalCancel   = document.getElementById('modal-cancel');
const modalConfirm  = document.getElementById('modal-confirm');
const toastEl       = document.getElementById('toast');

const SERVER_KEY = 'ia_server_url';

function getServerUrl() {
  return localStorage.getItem(SERVER_KEY) || 'http://localhost:3000';
}

function saveServerUrl(url) {
  localStorage.setItem(SERVER_KEY, url.trim());
}

serverUrlInput.value = getServerUrl();

function showToast(msg, duration = 3000) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), duration);
}

textarea.addEventListener('input', () => {
  const count = analyzer.getCharacterCount(textarea.value);
  charCountEl.textContent = `${count} / 1000 Caracteres`;
});

function updateBasicMetrics() {
  const text = textarea.value;
  charNoSpaceEl.textContent   = `Caracteres sin espacios: ${analyzer.getCharacterCountExcludingSpaces(text)}`;
  wordCountEl.textContent     = `Palabras: ${analyzer.getWordCount(text)}`;
  numberCountEl.textContent   = `Números: ${analyzer.getNumberCount(text)}`;
  avgWordLengthEl.textContent = `Promedio longitud: ${analyzer.getAverageWordLength(text).toFixed(2)}`;
  paragraphCountEl.textContent= `Párrafos: ${analyzer.getParagraphCount(text)}`;
  sentenceCountEl.textContent = `Oraciones: ${analyzer.getSentenceCount(text)}`;
}

function updatePanelMetrics() {
  const text = textarea.value;

  readingTimeEl.textContent = `Tiempo de lectura: ${analyzer.getReadingTime(text)}`;
  idiomaEl.textContent      = `Idioma: ${analyzer.getLanguage(text)}`;

  const totalWords     = analyzer.getWordCount(text);
  const repeated       = analyzer.getRepeatCount(text);
  const unique         = totalWords > 0 ? totalWords - repeated : 0;
  const uniquePct      = totalWords > 0 ? Math.round((unique    / totalWords) * 100) : 0;
  const repeatedPct    = totalWords > 0 ? Math.round((repeated  / totalWords) * 100) : 0;

  repeatCountEl.innerHTML = totalWords === 0
    ? `<span style="font-size:0.85rem;color:#999;">Palabras repetidas: —</span>`
    : `
      <div style="margin-bottom:8px;font-size:0.85rem;display:flex;justify-content:space-between;">
        <span>Palabras únicas: <strong>${unique}</strong></span>
        <span>Repetidas: <strong>${repeated}</strong></span>
      </div>
      <div style="background:#cfc6b0;border-radius:6px;overflow:hidden;height:22px;width:100%;margin-bottom:6px;">
        <div style="width:${uniquePct}%;height:100%;background:linear-gradient(90deg,#7aadba,#9cc6d6);border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
      <div style="background:#cfc6b0;border-radius:6px;overflow:hidden;height:22px;width:100%;">
        <div style="width:${repeatedPct}%;height:100%;background:linear-gradient(90deg,#2d6e7e,#4a9aad);border-radius:6px;transition:width 0.4s ease;"></div>
      </div>
      <div style="font-size:0.75rem;color:#666;margin-top:6px;display:flex;justify-content:space-between;">
        <span>Únicas ${uniquePct}%</span>
        <span>Repetidas ${repeatedPct}%</span>
      </div>`;

  const result = analyzer.getReadability(text);
  const barColor = result.score >= 70
    ? 'linear-gradient(90deg,#5db85b,#90e887)'
    : result.score >= 50
      ? 'linear-gradient(90deg,#8a6dd3,#c3b1f4)'
      : 'linear-gradient(90deg,#d36d6d,#f4b1b1)';
  const dotColor = result.score >= 70 ? '#3db85b' : result.score >= 50 ? '#e6a817' : '#d93b3b';

  readabilityEl.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
      <span style="font-family:'Asul',serif;font-size:0.95rem;">Legibilidad</span>
      <span style="font-family:'Asul',serif;font-size:1.6rem;font-weight:700;">${result.score}%</span>
    </div>
    <div style="background:#cfc6b0;border-radius:10px;overflow:hidden;height:14px;margin-bottom:10px;">
      <div style="width:${result.score}%;height:100%;border-radius:10px;background:${barColor};transition:width 0.4s ease;"></div>
    </div>
    <span style="font-size:0.9rem;display:flex;align-items:center;gap:8px;">
      Nivel ${result.label}
      <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${dotColor};"></span>
    </span>`;

  if (fleschGradeEl) {
    fleschGradeEl.textContent = `Grado Flesch: ${analyzer.getFleschKincaidGrade(text)}`;
  }
}

btnAnalizar.addEventListener('click', () => {
  if (!textarea.value.trim()) {
    showToast('⚠️ Escribe algún texto primero.');
    return;
  }
  updateBasicMetrics();
  updatePanelMetrics();
});

resetButton.addEventListener('click', () => {
  textarea.value = '';
  charCountEl.textContent = '0 / 1000 Caracteres';
  updateBasicMetrics();
  updatePanelMetrics();
});

btnIA.addEventListener('click', () => {
  if (!textarea.value.trim()) {
    showToast('⚠️ Escribe algún texto para mejorar.');
    return;
  }
  serverUrlInput.value = getServerUrl();
  modalIA.classList.add('open');
});

modalCancel.addEventListener('click', () => modalIA.classList.remove('open'));
modalIA.addEventListener('click', (e) => { if (e.target === modalIA) modalIA.classList.remove('open'); });

modalConfirm.addEventListener('click', async () => {
  const url = serverUrlInput.value.trim();
  if (!url) { showToast('⚠️ Ingresa la URL del servidor.'); return; }

  saveServerUrl(url);
  modalIA.classList.remove('open');

  const text = textarea.value;
  btnIA.disabled = true;
  btnIA.innerHTML = '<span class="spinner"></span> Mejorando...';

  try {
    const res = await fetch(`${url}/mejorar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    if (data.result) {
      textarea.value = data.result;
      updateBasicMetrics();
      showToast('✅ Texto mejorado con IA.');
    } else {
      throw new Error('Respuesta vacía del servidor');
    }
  } catch (err) {
    showToast(`❌ Error: ${err.message}. ¿Está corriendo server.js?`, 5000);
  } finally {
    btnIA.disabled = false;
    btnIA.innerHTML = '✨ Mejorar texto con IA';
  }
});

btnExportar.addEventListener('click', () => {
  const text = textarea.value.trim();
  if (!text) { showToast('⚠️ Analiza un texto primero.'); return; }

  const result = analyzer.getReadability(text);
  const lines = [
    '=== ANALIZADOR DE TEXTO — RESULTADO ===',
    `Fecha: ${new Date().toLocaleString('es-CL')}`,
    '',
    '--- TEXTO ANALIZADO ---',
    text,
    '',
    '--- MÉTRICAS ---',
    `Palabras:                ${analyzer.getWordCount(text)}`,
    `Caracteres sin espacios: ${analyzer.getCharacterCountExcludingSpaces(text)}`,
    `Párrafos:                ${analyzer.getParagraphCount(text)}`,
    `Oraciones:               ${analyzer.getSentenceCount(text)}`,
    `Números:                 ${analyzer.getNumberCount(text)}`,
    `Promedio longitud:       ${analyzer.getAverageWordLength(text).toFixed(2)}`,
    '',
    '--- COMPLEJIDAD ---',
    `Idioma:                  ${analyzer.getLanguage(text)}`,
    `Tiempo de lectura:       ${analyzer.getReadingTime(text)}`,
    `Grado Flesch:            ${analyzer.getFleschKincaidGrade(text)}`,
    `Legibilidad:             ${result.score}% — ${result.label}`,
    `Palabras repetidas:      ${analyzer.getRepeatCount(text)}`,
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'analisis-texto.txt';
  a.click();
  URL.revokeObjectURL(a.href);
  showToast('📄 Resultado exportado.');
});
