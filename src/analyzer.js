
const analyzer = {

  getWordCount(text) {
    if (!text || !text.trim()) return 0;
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  },

  getCharacterCount(text) {
    return text ? text.length : 0;
  },

  getCharacterCountExcludingSpaces(text) {
    if (!text) return 0;
    return text.replace(/[^a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ]/g, '').length;
  },

  getAverageWordLength(text) {
    if (!text) return 0;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length === 0) return 0;
    return words.reduce((acc, w) => acc + w.length, 0) / words.length;
  },

  getNumberCount(text) {
    if (!text) return 0;
    const numbers = text.match(/\d+/g);
    return numbers ? numbers.length : 0;
  },

  getParagraphCount(text) {
    if (!text) return 0;
    return text.split('\n').filter(line => line.trim() !== '').length;
  },

  getSentenceCount(text) {
    if (!text) return 0;
    return text.split(/[.!?]+/).filter(s => s.trim() !== '').length;
  },

  getRepeatCount(text) {
    if (!text) return 0;
    const counter = {};
    text.trim().split(/\s+/).forEach(word => {
      const clean = word.replace(/[^\wáéíóúñü]/gi, '').toLowerCase();
      if (clean) counter[clean] = (counter[clean] || 0) + 1;
    });
    return Object.values(counter).filter(c => c > 1).length;
  },

  getReadingTime(text) {
    if (!text) return '0 s';
    const words = text.trim().split(/\s+/).length;
    const time = words / 200;
    const minutes = Math.floor(time);
    const seconds = Math.round((time - minutes) * 60);
    if (minutes === 0) return `${seconds} s`;
    if (seconds === 0) return `${minutes} min`;
    return `${minutes} min ${seconds} s`;
  },

  getLanguage(text) {
    if (!text || text.trim().length < 2) return '—';
    const lower = text.toLowerCase();

    const spanish = /\b(que|los|las|una|con|por|para|como|este|esta|pero|más|tiene|hay|muy|hola|bien|mal|sí|yo|tú|él|ella|nosotros|ellos|hacer|tener|ser|estar|ir|ver|dar|saber|querer|hablar|llevar|dejar|seguir|encontrar|venir|pensar|salir|volver|tomar|conocer|vivir|sentir|también|porque|cuando|donde|todo|nada|algo|siempre|nunca|antes|después|ahora|hoy|grande|pequeño|nuevo|viejo|bueno|malo|mucho|poco)\b/g;
    const english = /\b(the|and|that|have|for|not|with|you|this|but|his|from|they|she|is|are|was|were|be|been|has|had|do|did|will|would|could|should|may|might|can|hello|hi|good|bad|big|small|new|old|much|few|other|same|always|never|before|after|now|today|where|when|also|something|nothing|someone|nobody)\b/g;

    const esCount = (lower.match(spanish) || []).length;
    const enCount = (lower.match(english) || []).length;

    if (esCount === 0 && enCount === 0) return 'Desconocido';
    return esCount >= enCount ? 'Español 🇪🇸' : 'Inglés 🇬🇧';
  },

  countSyllables(text) {
    if (!text) return 0;
    const words = text.toLowerCase().replace(/[^\w\sáéíóúüñ]/g, '').split(/\s+/).filter(w => w.length > 0);
    return words.reduce((total, word) => {
      const vowels = word.match(/[aeiouáéíóúü]+/g);
      return total + (vowels ? vowels.length : 1);
    }, 0);
  },

  getFleschKincaidGrade(text) {
    if (!text) return 0;
    const words = this.getWordCount(text);
    const sentences = this.getSentenceCount(text);
    const syllables = this.countSyllables(text);
    if (words === 0 || sentences === 0) return 0;
    const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
    return Math.max(0, Math.round(grade * 10) / 10);
  },

  getReadability(text) {
    if (!text) return { label: '— Texto vacío', score: 0, grade: 0 };
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length < 5) return { label: '— Muy corto', score: 0, grade: 0 };

    const sentences = text.split(/[.!?]+/).filter(s => s.trim() !== '');
    let syllables = 0;
    words.forEach(word => {
      const clean = word.toLowerCase().replace(/[^\wáéíóúñü]/gi, '');
      const m = clean.match(/[aeiouáéíóúü]+/g);
      if (m) syllables += m.length;
    });

    const wps = words.length / (sentences.length || 1);
    const spw = syllables / words.length;
    let score = Math.round(206.84 - 0.60 * spw - 1.02 * wps);
    score = Math.max(0, Math.min(100, score));

    const grade = this.getFleschKincaidGrade(text);
    const label = score >= 70 ? 'Fácil' : score >= 50 ? 'Medio' : 'Difícil';
    return { label, score, grade };
  }
};

export default analyzer;
