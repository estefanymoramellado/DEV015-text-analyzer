import analyzer from './analyzer.js';

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById("reset-button");
  const textarea = document.querySelector('textarea[name="user-input"]');
  const caracteresLiDefault = document.querySelector('.caracteres[data-caracteres="default"]');
  const caracteresLiSinEspacios = document.querySelector('.caracteres[data-caracteres="sin espacios"]');
  const caracteresLiPalabras = document.querySelector('.caracteres[data-caracteres="palabras"]');
  const caracteresLiNumeros = document.querySelector('.caracteres[data-caracteres="numeros"]');
  const caracteresLiSuma = document.querySelector('.caracteres[data-caracteres="suma"]');
  const caracteresLiLongitud = document.querySelector('.caracteres[data-caracteres="longitud"]');


  textarea.addEventListener('input', function () {
    const texto = textarea.value;

    const caracteresDefault = analyzer.getCharacterCount(texto);
    caracteresLiDefault.textContent = 'Caracteres: ' + caracteresDefault;

    const sinEspacios = analyzer.getCharacterCountExcludingSpaces(texto);
    caracteresLiSinEspacios.textContent = 'Caracteres sin espacios: ' + sinEspacios;

    const palabras = analyzer.getWordCount(texto);
    caracteresLiPalabras.textContent = 'Palabras: ' + palabras;

    const numeros = analyzer.getNumberCount(texto);
    caracteresLiNumeros.textContent = 'Numeros: ' + numeros;


    const suma = analyzer.getNumbersSum(texto);
    caracteresLiSuma.textContent = 'Suma numeros: ' + suma;

    const longitud = analyzer.getAverageWordLength(texto);
    caracteresLiLongitud.textContent = 'Promedio longitud: ' + longitud;

    button.addEventListener("click", function () { 
    textarea.value = "";
    caracteresLiDefault.textContent = 'Caracteres:';
    caracteresLiSinEspacios.textContent = 'Caracteres sin espacios:';
    caracteresLiPalabras.textContent = 'Palabras:';
    caracteresLiNumeros.textContent = 'Numeros:';
    caracteresLiSuma.textContent = 'Suma numeros:';
    caracteresLiLongitud.textContent = 'Promedio longitud:';   
    });
  });
});