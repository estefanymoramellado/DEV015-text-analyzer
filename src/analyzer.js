
const analyzer = {
  //TODO: esta función debe retornar el recuento de caracteres que se encuentran en el parámetro `text` de tipo `string`.
  getCharacterCount: function (text) {
    return text.length;
  },
  getCharacterCountExcludingSpaces: function (text) {
    //TODO: esta función debe retornar el recuento de caracteres excluyendo espacios y signos de puntuación que se encuentran en el parámetro `
    const sin = text.replace(/[^a-zA-Z0-9]/g, "");
    return sin.length;
  },
  getWordCount: function (text) {
    //TODO: esta función debe retornar el recuento de palabras que se encuentran en el parámetro `text` de tipo `string`.
    const palabras = text.trim().split(/\s+/);
    return palabras.filter(palabra => {
      return palabra.length > 0 && !/^\d+$/.test(palabra);
    }).length;
  },
  getNumberCount: (text) => {
    //TODO: esta función debe retornar cúantos números se encuentran en el parámetro `text` de tipo `string`.
    const numeros = text.match(/\d/g);
    return numeros ? numeros.length : 0;
  },

  getNumbersSum: (text) => {
    //TODO: esta función debe retornar la suma de todos los números que se encuentran en el parámetro text de tipo string.
    const numeros = text.match(/\d/g);
    if (numeros) {
      let suma = 0;
      for (let i = 0; i < numeros.length; i++) {
        suma += parseFloat(numeros[i]);
      }
      return suma;
    } else {
      return 0;
    }
  },
  
  getAverageWordLength: (text) => {    
    //TODO: esta función debe retornar la longitud media de palabras que se encuentran en el parámetro text de tipo string.
    const palabras = text.trim().split(/\s+/);
    let totalLength = 0;
    let validWordCount = 0;

    palabras.forEach((palabras) => {
      if (palabras.length > 0) {
      totalLength += palabras.length;
      validWordCount++;
    }
  });
    const avgWordLength = validWordCount ? totalLength / validWordCount : 0;
    return avgWordLength;
  
  },
};


export default analyzer;

