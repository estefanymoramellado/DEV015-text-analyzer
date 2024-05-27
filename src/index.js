//import analyzer from './analyzer.js';

document.addEventListener('DOMContentLoaded', function() {
  const textarea = document.querySelector('textarea[name="user-input"]');
  const caracteresLi = document.querySelector('.caracteres[data-caracteres="0"]');
  const caracteresSinLi = document.querySelector('.caracteres[data-caracteres-sin="0"]');
  const palabrasLi = document.querySelector('.caracteres[data-palabras="0"]');
  const numerosLi = document.querySelector('.numeros[data-palabras="0"]');

  textarea.addEventListener('input', function() {
    const texto = textarea.value;

    const caracteres = texto.length;
    caracteresLi.textContent = 'Caracteres: ' + caracteres;

    const caracteresSinEspacios = texto.replace(/[^a-zA-Z0-9]/g, "");
    const caracteresSinEspaciosLength = caracteresSinEspacios.length;
    caracteresSinLi.textContent = 'Caracteres sin espacios: ' + caracteresSinEspaciosLength;

    const palabras = texto.trim().split(/\s+/);
    const palabrasLength = palabras.filter(palabra => palabra.length > 0).length;
    palabrasLi.textContent = 'Palabras: ' + palabrasLength;

  });
});




//document.addEventListener('DOMContentLoaded', function() {
 // const textarea = document.querySelector('textarea[name="user-input"]');

//textarea.addEventListener('input', function() {

  //const texto = textarea.value;
 // const cleanedTest = texto.replace(/[^a-zA-Z0-9]/g, "");
  //const caracteresSinEspacios = cleanedTest.length

  //caracteresSinLi.textContent = 'Caracteres sin espacios: ' + caracteresSinEspacios;

  //});

//});




















//const string="  Esto    es  un    texto con    varios    espacios    ";
  //string.replace(/\s+/g, " "); // "  Esto es un texto con varios espacios    "
  //string.replace(/\s+/g, " ").trim(); // "Esto es un texto con varios espacios"
//const input = document.getElementById("input");
 // input.value.trim();

