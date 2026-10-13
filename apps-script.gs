/**
 * Sobreviví al Pantano · Nataclor
 * Recibe los datos del juego y devuelve el ranking.
 * Pegalo en Extensiones → Apps Script de un Google Sheet nuevo y publicalo como aplicación web.
 */
const HOJA = 'Leads';
const COLUMNAS = ['Fecha', 'Apodo', 'Mail o WhatsApp', 'Localidad', 'Tamaño de pile', 'Puntaje', 'Pile alcanzada', 'Productos juntados', 'Tiene los 5', 'Origen', 'Acepta bases'];

function hoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(HOJA);
  if (!sh) {
    sh = ss.insertSheet(HOJA);
    sh.appendRow(COLUMNAS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, COLUMNAS.length).setFontWeight('bold');
  }
  return sh;
}

function limpiar_(v, max) {
  return String(v == null ? '' : v).replace(/^[=+\-@]/, "'").slice(0, max);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    const puntaje = Math.max(0, Math.min(999999, parseInt(d.score, 10) || 0));
    if (!d.acepto || !d.apodo || !d.contacto) {
      return json_({ ok: false, error: 'faltan datos' });
    }
    hoja_().appendRow([
      new Date(),
      limpiar_(d.apodo, 12).toUpperCase(),
      limpiar_(d.contacto, 80),
      limpiar_(d.localidad, 60),
      limpiar_(d.pile, 30),
      puntaje,
      parseInt(d.nivel, 10) || 1,
      parseInt(d.productos, 10) || 0,
      d.tieneLos5 ? 'Sí' : 'No',
      limpiar_(d.origen, 40),
      'Sí'
    ]);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// GET ?accion=ranking → top 10 (solo apodo y puntaje, nunca datos de contacto)
function doGet() {
  const filas = hoja_().getDataRange().getValues().slice(1);
  const mejor = {};
  filas.forEach(f => {
    const apodo = f[1], score = Number(f[5]) || 0;
    if (apodo && (!mejor[apodo] || score > mejor[apodo])) mejor[apodo] = score;
  });
  const ranking = Object.keys(mejor)
    .map(apodo => ({ apodo, score: mejor[apodo] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  return json_({ ranking });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
