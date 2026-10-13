# Sobreviví al Pantano · Nataclor

## Qué hay en la carpeta

- `index.html`: el juego completo, en un solo archivo.
- `og.png`: la imagen que se ve al compartir el link (WhatsApp, Instagram, LinkedIn).
- `apps-script.gs`: el código del Google Sheet donde se guardan el ranking y los datos.

## 1. Subirlo a Vercel (5 minutos)

1. Entrá a vercel.com con la cuenta de la agencia y tocá **Add New → Project**.
2. Elegí **Deploy without Git** (o "Browse") y arrastrá esta carpeta entera.
3. Framework: **Other**. No hay que configurar build. Tocá **Deploy**.
4. Para usar un dominio propio (por ejemplo `pantano.nataclor.com.ar`), andá a **Settings → Domains** del proyecto. El DNS lo configura quien administre el dominio de Nataclor.

Si no conectás el Google Sheet, el juego funciona igual, pero cada persona ve solamente su propio ranking y los datos no se guardan en ningún lado.

## 2. Conectar el Google Sheet (ranking y datos)

1. Creá un Google Sheet nuevo, por ejemplo "Sobreviví al Pantano · Leads", en el Drive de Nataclor o de la agencia.
2. **Extensiones → Apps Script**. Borrá lo que aparece, pegá el contenido de `apps-script.gs` y guardá.
3. **Implementar → Nueva implementación**. Tipo: **Aplicación web**. Ejecutar como: **Yo**. Quién tiene acceso: **Cualquier persona**. Autorizá los permisos.
4. Copiá la URL que termina en `/exec`.
5. En `index.html`, buscá `const SHEET_URL = "";` y pegá la URL entre las comillas. Volvé a subir la carpeta a Vercel.

Cada partida guardada se agrega como una fila en la hoja **Leads**: fecha, apodo, mail o WhatsApp, localidad, tamaño de pile, puntaje, pile alcanzada, productos juntados, si tuvo los 5, origen y aceptación de las bases. El ranking público muestra solo el apodo y el puntaje, nunca los datos de contacto.

## 3. Links con origen

Agregá `?origen=` al link para saber de dónde llega cada jugador. Queda registrado en la columna Origen:

- `…/?origen=carrusel` para el link en bio del carrusel
- `…/?origen=stories`
- `…/?origen=pauta`
- `…/?origen=distribuidor-NOMBRE` para el kit de distribuidores

## Antes de publicar

- **Bases y condiciones.** El juego tiene dos links a `#bases`, uno en el formulario y otro en el pie. Reemplazalos por la URL real de las bases cuando legales de Nataclor las apruebe.
- **Protección de datos.** El formulario pide consentimiento explícito. Confirmá con Nataclor que la base esté registrada según la Ley 25.326.
- **Premios.** El texto del formulario dice "participá por los premios". Ajustalo cuando el premio esté definido.
