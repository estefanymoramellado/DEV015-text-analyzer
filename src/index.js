import analyzer from './analyzer.js';

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById("reset-button");
  const textarea = document.querySelector('textarea[name="user-input"]');
  const caracteresLiCharacterCount = document.querySelector('.caracteres[data-testid="character-count"]');
  const caracteresLiCharacterNoSpacesCount = document.querySelector('.caracteres[data-testid="character-no-spaces-count"]');
  const caracteresLiWordCount = document.querySelector('.caracteres[data-testid="word-count"]');
  const caracteresLiNumberCount = document.querySelector('.caracteres[data-testid="number-count"]');
  const caracteresLiNumberSum = document.querySelector('.caracteres[data-testid="number-sum"]');
  const caracteresLiWordLengthAverage = document.querySelector('.caracteres[data-testid="word-length-average"]');


  textarea.addEventListener('input', function () {
    const texto = textarea.value;

    const characterCount = analyzer.getCharacterCount(texto);
    caracteresLiCharacterCount.textContent = 'Caracteres: ' + characterCount;

    const characterNoSpacesCount = analyzer.getCharacterCountExcludingSpaces(texto);
    caracteresLiCharacterNoSpacesCount.textContent = 'Caracteres sin espacios: ' + characterNoSpacesCount;

    const wordCount = analyzer.getWordCount(texto);
    caracteresLiWordCount.textContent = 'Palabras: ' + wordCount;

    const numberCount = analyzer.getNumberCount(texto);
    caracteresLiNumberCount.textContent = 'Numeros: ' + numberCount;

    const numberSum = analyzer.getNumbersSum(texto);
    caracteresLiNumberSum.textContent = 'Suma numeros: ' + numberSum;

    const wordLengthAverage = analyzer.getAverageWordLength(texto);
    caracteresLiWordLengthAverage.textContent = 'Promedio longitud: ' + wordLengthAverage;

    button.addEventListener("click", function () {
      textarea.value = "";
      caracteresLiCharacterCount.textContent = 'Caracteres:';
      caracteresLiCharacterNoSpacesCount.textContent = 'Caracteres sin espacios:';
      caracteresLiWordCount.textContent = 'Palabras:';
      caracteresLiNumberCount.textContent = 'Números:';
      caracteresLiNumberSum.textContent = 'Suma números:';
      caracteresLiWordLengthAverage.textContent = 'Promedio longitud:';
    });
  });
});