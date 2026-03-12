const analyzer = {
  getWordCount: (text) => {
    if (!text) return 0;
    const words = text.trim().split(/\s+/);
    return words.length;
  },

  getCharacterCount: (text) => {
    if (!text) return 0;
    return text.length;
  },

  getCharacterCountExcludingSpaces: (text) => {
    if (!text) return 0;
    const cleaned = text.replace(/[^a-zA-Z0-9]/g, '');
    return cleaned.length;
  },

  getAverageWordLength: (text) => {
    if (!text) return 0;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length === 0) return 0;
    const totalLength = words.reduce((acc, word) => acc + word.length, 0);
    return totalLength / words.length;
  },

  getNumberCount: (text) => {
    if (!text) return 0;
    const numbers = text.match(/\d+/g);
    return numbers ? numbers.length : 0;
  },

  getNumberSum: (text) => {
    if (!text) return 0;
    const numbers = text.match(/\d+/g);
    if (!numbers) return 0;
    return numbers.reduce((sum, num) => sum + Number(num), 0);
  },

  getParagraphCount: (text) => {
    if (!text) return 0;
    const lines = text.split('\n');
    const paragraphs = lines.filter(line => line.trim() !== '');
    return paragraphs.length;
  },

  getSentenceCount: (text) => {
    if (!text) return 0;
    const part = text.split(/[.!?]+/);
    const sentence = part.filter(line => line.trim() !== '');
    return sentence.length;
  },

  getRepeatCount: (text) => {
    if (!text) return {};

    const words = text.trim().split(/\s+/);

    const counter = {};

    words.forEach(word => {
      word = word.replace(/[^\wáéíóúñü]/gi, '').toLowerCase();

      if (counter[word]) {
        counter[word]++;
      } else {
        counter[word] = 1;
      }
    });

    const repeated = Object.values(counter).filter(count => count > 1);

    return repeated.length;

  },

  getReadingTime: (text) => {
    if (!text) return "0 s";

    const words = text.trim().split(/\s+/);
    const time = words.length / 200; 

    const minutes = Math.floor(time);
    const seconds = Math.round((time - minutes) * 60);

    if (minutes === 0) return `${seconds} s`;
    if (seconds === 0) return `${minutes} min`;

    return `${minutes} min ${seconds} s`;
  },

  getLanguage: (text) => {
    if (!text || text.trim().length < 2) return "—";

    const lower = text.toLowerCase();

    const spanish = /\b(que|los|las|una|con|por|para|como|este|esta|pero|más|tiene|hay|muy|hola|casa|coche|perro|gato|bien|mal|sí|no|yo|tú|él|ella|nosotros|ellos|hacer|tener|ser|estar|ir|ver|dar|saber|querer|llegar|pasar|deber|poner|parecer|quedar|creer|hablar|llevar|dejar|seguir|encontrar|llamar|venir|pensar|salir|volver|tomar|conocer|vivir|sentir|tratar|mirar|contar|empezar|esperar|buscar|existir|entrar|trabajar|escribir|perder|producir|ocurrir|entender|pedir|recibir|recordar|terminar|permitir|aparecer|conseguir|comenzar|servir|sacar|necesitar|mantener|resultar|leer|caer|cambiar|presentar|crear|abrir|considerar|oír|puede|tiene|están|están|somos|tengo|quiero|puedo|vamos|hace|dice|aquí|allí|también|porque|cuando|donde|todo|nada|algo|alguien|nadie|siempre|nunca|antes|después|ahora|hoy|ayer|mañana|grande|pequeño|nuevo|viejo|bueno|malo|mucho|poco|otro|mismo|cada|entre|hasta|desde|durante|mientras|aunque|sino|pues|así)\b/g,

      english = /\b(the|and|that|have|for|not|with|you|this|but|his|from|they|she|is|are|was|were|be|been|has|had|do|did|will|would|could|should|may|might|can|hello|hi|car|house|go|come|see|know|think|make|take|get|give|look|use|find|tell|ask|feel|call|keep|let|show|hear|play|run|move|live|write|read|open|walk|follow|stop|create|speak|buy|wait|love|remember|build|stay|fall|reach|good|bad|big|small|new|old|much|few|other|same|each|between|until|from|during|while|although|because|when|where|always|never|before|after|now|today|yesterday|tomorrow|here|there|also|something|nothing|someone|nobody|every|both|either|neither|however|therefore|moreover|furthermore|yes|no|okay|ok|please|thanks|thank|sorry|excuse|help|need|want|like|love|hate|happy|sad|angry|tired|hungry|thirsty|friend|family|home|school|work|time|day|night|year|world|life|way|man|woman|child|people|place|thing|hand|eye|head|face|name|word|book|money|country|city|street)\b/g;

    const spanishMatches = (lower.match(spanish) || []).length;
    const englishMatches = (lower.match(english) || []).length;

    if (spanishMatches === 0 && englishMatches === 0) return "Desconocido";
    return spanishMatches >= englishMatches ? "Español 🇪🇸" : "Inglés 🇬🇧";
  },
  countSyllables: (text) => {
    if (!text) return 0;
    
    const cleanText = text.toLowerCase().replace(/[^\w\sáéíóúüñ]/g, '');
    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    
    let totalSyllables = 0;
    
    for (const word of words) {
      const vowelGroups = word.match(/[aeiouáéíóúü]+/g);
      if (vowelGroups) {
        totalSyllables += vowelGroups.length;
      } else if (word.length > 0) {
        totalSyllables += 1;
      }
    }
    
    return totalSyllables;
  },
  
  getFleschKincaidGrade: (text) => {
    if (!text || typeof text !== 'string') return 0;
    
    const words = analyzer.getWordCount(text);
    const sentences = analyzer.getSentenceCount(text);
    const syllables = analyzer.countSyllables(text);
    
    if (words === 0 || sentences === 0) return 0;
    
  
    const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;

    const finalGrade = Math.max(0, Math.round(grade * 10) / 10);
    
    return finalGrade;
  },

  getReadability: (text) => {
    if (!text) return { label: "— Texto vacío", score: 0, grade: 0 };
    
    const words = text.trim().split(/\s+/);
    if (words.length < 5) return { label: "— Muy corto", score: 0, grade: 0 };

    const sentences = text.split(/[.!?]+/).filter(s => s.trim() !== '');
    let syllables = 0;
    words.forEach(word => {
      const clean = word.toLowerCase().replace(/[^\wáéíóúñü]/gi, '');
      const matches = clean.match(/[aeiouáéíóúü]+/g);
      if (matches) syllables += matches.length;
    });

    const wordsPerSentence = words.length / (sentences.length || 1);
    const syllablesPerWord = syllables / words.length;
    let score = Math.round(206.84 - (0.60 * syllablesPerWord) - (1.02 * wordsPerSentence));
    score = Math.max(0, Math.min(100, score)); 

    const grade = analyzer.getFleschKincaidGrade(text);

    const label = score >= 70 ? "Fácil" : score >= 50 ? "Medio" : "Difícil";
    return { label, score, grade };
  },


  


};

export default analyzer;
