# LILAS — Rediseño visual

Versión del 24 de octubre de 2026, creada sobre el proyecto proporcionado por el usuario.

Actualización del 25 de octubre: «Siempre hay un motivo» incorpora un desplegable con cumpleaños, bautizos y aniversarios, fotografías locales y enlaces que seleccionan el tipo de evento en el cotizador. Reutiliza el estilo y los elementos nativos de la carta ampliable. Apertura, cierre, carga de las tres imágenes y adaptación a 390 px comprobados en navegador; consulta de bautizo verificada sin enviar datos.

## Abrir la página

Descomprime la carpeta completa y abre `index.html` con tu navegador. También puedes abrir la carpeta en Visual Studio Code y usar Live Server.

## Archivos principales

- `index.html`: contenido, estructura, carta ampliable y preguntas frecuentes.
- `styles.css`: identidad visual, composición, estados interactivos y adaptaciones para escritorio, tablet y móvil.
- `cinematic.css`: portada inmersiva, encabezado transparente, paleta aceituna/lila y efectos de aparición.
- `script.js`: interacciones originales de cotización más los controles de video y efectos visuales.
- `assets/video/`: video de boda local en Full HD y HD para móviles.
- `assets/img/`: imágenes locales. Los platos tienen versiones JPEG de 480 y 900 px.
- `assets/ATTRIBUTIONS.md`: procedencia y limitaciones del material visual recibido.

## Dirección visual

Inspiración visual: la portada y el encabezado de https://lesaintgeorges.ch/. Video de boda a pantalla completa, encabezado transparente que cambia al desplazarse, tipografías Newsreader y DM Sans, paleta de aceituna, lila y marfil, apariciones suaves y desplazamiento sutil del fondo. La carta conserva sus diez platos y los servicios, inclusiones y contactos de LILAS siguen disponibles. La sección «Más que un buen plato» incorpora una fotografía de boda de alta resolución.

Las tipografías se solicitan a Google Fonts. Si no hay conexión, se utilizan Georgia y Arial. Las fotografías están guardadas localmente.

## Alcance funcional conservado

El formulario mantiene los campos, validación y destino WhatsApp originales. Prepara un mensaje; el visitante debe enviarlo desde WhatsApp. No se añadieron bases de datos, pagos, analítica ni integraciones comerciales nuevas. La carta ampliable y las preguntas frecuentes utilizan elementos HTML nativos `details` y `summary`.

El video se reproduce en silencio y en bucle, con un control de pausa. Se detiene fuera de pantalla o al cambiar de pestaña y respeta la pausa manual. Si se solicita movimiento reducido o ahorro de datos, muestra el póster y solo inicia al pulsar reproducir. Si el navegador bloquea la reproducción automática, el botón permite iniciarla. Sin JavaScript, los textos y la fotografía de portada permanecen visibles.

## Comprobaciones realizadas

- Sintaxis JavaScript verificada con Node.
- Sin identificadores HTML duplicados, archivos locales faltantes ni anclas rotas.
- Todas las imágenes tienen texto alternativo y dimensiones declaradas.
- Las opciones de evento de las tarjetas coinciden con las del formulario.
- La lógica original del formulario se conserva; los efectos se agregan por separado al final del archivo.
- Comprobación numérica de contraste de los colores principales.
- Imágenes de platos: 2.853.021 bytes en total, incluyendo ambos tamaños, frente a los 26.528.158 bytes de los PNG originales.

La versión cinematográfica se comprobó en el navegador mediante una vista previa HTTP limitada a la carpeta del proyecto: reproducción 1920×1080 en escritorio y 1280×720 en móvil, pausa, menú móvil, encabezado al desplazarse y nueva fotografía. No se observaron errores de JavaScript ni desbordamiento horizontal en la vista móvil comprobada. Esto no sustituye pruebas en dispositivos físicos ni una auditoría Lighthouse.

Las imágenes continúan siendo referenciales. Esta versión no presenta testimonios, clientes, cifras ni trabajos realizados que no hayan sido proporcionados.
