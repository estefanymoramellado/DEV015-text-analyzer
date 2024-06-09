
Primer Sprint

Lo primero que hice fue realizar una lectura intensiva del Reedme.
Comencé por generar una especie de "esqueleto" de mi Analizador de texto en HTML;
Investigando sobre la estructura básica, tales como: Head, body y footer.

Entendiendo que head conservará la informacion general de mi analizador.
Para luego comenzar con Body, en el cual indiqué un elemento <header> y en esta, un titulo con <h1>

Cree los 6 hijos de ul <li> para enlistar las opciones de conteo y crear cada opcion en un bloque.
y como parte central del analizador de texto, use un textarea con atributo name señalado en el reedme.
Para casi finalizar con mi estructura html, cree un button con atributo id para resetear las metricas.
Finalmente, terminé con un footer, con mi nombre y cerré la etiqueta body.

Di paso al diseño de mi css. Olvidé que había que hacer un prototipo y fui directo a diseñarlo.
Siempre tuve en mente un diseño mas limpio y simple, ya que las referencias que vi en paginas en Google eran así.

Principalmente use "selecetores de tipo" para mis etiquetas body y header, dandole una ubicación central a todo mi contenido.
Pasé a los selectores tipo class, a los cuales llamé en conjunto a través de .caracteres dos veces; en uno le di forma a la caja contenedora de estos y en la otra, le di estilo y color a la letra.
Continué con el diseño del textarea, usando selector de atributo, en este caso con name = user-input.
Tambien usé un seudo-elemento para darle diseño a placeholder.
Para el boton de reseteo de métricas tuve que usar un selector de tipo ID #reset button y ya finalmente use un selector de tipo para footer.

Segundo Sprint
En este punto del proyecto, decidí releer nuevamente el reedme y comenzar a investigar sobre Javascript, ya que la confusion era bastante grande y no entendía nada.
Algo que me sirvió bastante fue saber que era un queryselector y los elementbyid y elementbyclass. Algo que sería fundamental en la estructura de mi index.js y analyzer.
Comencé creando un addeventlistener junto a un DOM Contentloaded, para que de paso a que la informacion html inicial se ejecute, junto a la creación de la funcion del textarea, use un queryselector, ya que al no tener atributo ni name, ni id, sólo me quedaba la opcion de usar un queryselector.
Para poder comenzar con la funcionalidad de los caracteres, debí llamar al contenido del textarea (input) con un addeventlistener.
Después de esto, le di completa dedicación a las funciones.
Cree una contante de texto con el valor del textarea para que mis funciones reconocieran lo que hay dentro del input, ais poder guardarlo y manipularlo. 

Comencé por crear la funcion de contar caracteres, ya que parecía la mas simple y la cual no iba a necesitar especificar excepciones;
Cree una constante de caracteres y la enlazé con la funcionalidad de analyzer, introducí un textconent, el cual me permitiria guardar y manipular la cantidad de caracteres.
Para Analyzer use el metodo de manipulacion de string llamado length, el cual se encargará de mostrarme la cantidad de caracteres de una cadena.

Continué con la funcion contar caracteres sin signos ni espacios, y para eso en analyzer recurrí a replace, la que cuando encontrase espacios los tome como nada. Especifiqué con una expresion regular lo que no debía tomar como nulo; ya sea, numero, mayusculas.

Para contar palabras manipulé la cadena con trim para quitar espacios y split para dividir la cadena en palabras sin contar los espacios y luego ocoupé un filtro para las palabras que pasancon trim y split. Siendo mas especifica en que letras seguidas de numeros (sin espacios), no formen palabras.

3 Sprint

Continué con la funcion de contar numeros usando match para buscar coincidencias dentro de la cadena como numeros y numeros con decimales, para entregar el valorocupe un operador ternario.

Para la funcion de suma de numeros, volví a recurrir a match para identificar numero y numeros decimales 
luego use la funcion if else for. 
If si la condicion encuentra número, se inicia el contador de suma. Luego cree un bloque que recorriera los numeros enteros y decimales y lo agregre a la funcion de suma, si no encuentra valor, retorna a cero.

Finalmente la variable de promedio de longitud la realicé de la siguiente forma: Llame a la funcion de contar palabras. 
Cree dos variables; un contador de longitud de palabras y un contador de total de palabras válidas, luego integré una funcion condicional, en donde si la longitud de palabra es mayor a cero, se cuenta como valida y se su suma, y el contador de palabras validas se incrementa.
Ya para saber la longitud de la palabra, cree un condicion tambien en donde se divide, la longitud de palabra total por la cantidad de palabras validas.
Finalmente para obtener decimales incluí parsefloat y tofixed con solo dos decimales.



