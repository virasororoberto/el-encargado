const webpush = require('web-push');

const SUPA_URL = 'https://gygjvlrudrqtwoqblywj.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Z2p2bHJ1ZHJxdHdvcWJseXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzMDAwMjEsImV4cCI6MjEwNDg3NjAyMX0.BJGAV_csE4bQYJX9Jgdik8ZLlLgT028lW7g8Pd_zhlo';
const VAPID_PUBLIC = 'BOAGNXh39542q19k8wIvx_jETHpHlNT8eo96zKW9wqsIdIvkNanow0cpXsV3m4DNVbUS95nFP-ftSew7W_NJjG0';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ ok:false, error:'Method not allowed' }); return; }

  const priv = process.env.VAPID_PRIVATE;
  if (!priv) { res.status(500).json({ ok:false, error:'Falta configurar VAPID_PRIVATE en Vercel' }); return; }
  webpush.setVapidDetails('mailto:virasororoberto@gmail.com', VAPID_PUBLIC, priv);

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch(e){ body = {}; } }
  body = body || {};
  const locales = Array.isArray(body.locales) ? body.locales : [];
  const titulo = body.titulo || 'Feria del Litoral';
  const mensaje = body.body || '';
  const url = body.url || 'mi-local.html';
  if (!locales.length) { res.status(400).json({ ok:false, error:'No se indicaron locales' }); return; }

  const inList = locales.map(x => parseInt(x)).filter(x => !isNaN(x)).join(',');
  let subs = [];
  try {
    const r = await fetch(SUPA_URL + '/rest/v1/push_subs?local=in.(' + inList + ')&activo=eq.true&select=*', {
      headers: { apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY }
    });
    subs = await r.json();
    if (!Array.isArray(subs)) subs = [];
  } catch(e) { res.status(500).json({ ok:false, error:'No se pudieron leer las suscripciones: '+e.message }); return; }

  const payload = JSON.stringify({ title: titulo, body: mensaje, url: url });
  let ok = 0, fail = 0;
  for (const s of subs) {
    try {
      await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload);
      ok++;
    } catch(e) {
      fail++;
      if (e.statusCode === 410 || e.statusCode === 404) {
        try { await fetch(SUPA_URL + '/rest/v1/push_subs?endpoint=eq.' + encodeURIComponent(s.endpoint), {
          method:'PATCH', headers:{ apikey:SUPA_KEY, Authorization:'Bearer '+SUPA_KEY, 'Content-Type':'application/json', Prefer:'return=minimal' },
          body: JSON.stringify({ activo:false })
        }); } catch(_){}
      }
    }
  }
  res.status(200).json({ ok:true, enviados: ok, fallidos: fail, total: subs.length });
};
