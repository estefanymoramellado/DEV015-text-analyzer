
const analyzer = {
  //TODO: esta función debe retornar el recuento de caracteres que se encuentran en el parámetro `text` de tipo `string`.
  getCharacterCount: function (text) {
    return text.length;
  },
  getCharacterCountExcludingSpaces: function (text) {
    //TODO: esta función debe retornar el recuento de caracteres excluyendo espacios y signos de puntuación que se encuentran en el parámetro `
    const characterNoSpacesCount = text.replace(/[^a-zA-Z0-9]/g, "");
    return characterNoSpacesCount.length;
  },
  getWordCount: function (text) {
    //TODO: esta función debe retornar el recuento de palabras que se encuentran en el parámetro `text` de tipo `string`.
    const words = text.trim().split(/\s+/);
    const filteredWords = words.filter(word => !/^\d+(\.\d+)?$/.test(word) && !/^[^\w\s]+$/.test(word));
    return filteredWords.length;
  },
  getNumberCount: (text) => {
    //TODO: esta función debe retornar cúantos números se encuentran en el parámetro `text` de tipo `string`.
    const numberCount = text.match(/\b\d+(\.\d+)?\b/g);
    return numberCount ? numberCount.length : 0;
  },

  getNumberSum: (text) => {
    //TODO: esta función debe retornar la suma de todos los números que se encuentran en el parámetro text de tipo string.
    const numbers = text.match(/\b\d+(\.\d+)?\b/g);
    if (numbers) {
      let sum = 0;
      for (let i = 0; i < numbers.length; i++) {
        sum += parseFloat(numbers[i]);
      }
      return sum;
    } else {
      return 0;
    }
  },

  getAverageWordLength: (text) => {
    //TODO: esta función debe retornar la longitud media de palabras que se encuentran en el parámetro text de tipo string.
    const words = text.trim().split(/\s+/);
    let totalLength = 0;
    let validWordCount = 0;

    words.forEach((word) => {
      if (word.length > 0) {
        totalLength += word.length;
        validWordCount++;
      }
    });
    const avgWordLength = validWordCount ? totalLength / validWordCount : 0;
    return parseFloat(avgWordLength.toFixed(2));
  },
};


export default analyzer;

