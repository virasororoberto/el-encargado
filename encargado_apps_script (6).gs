/**
 * EL ENCARGADO v5.0 - Feria del Litoral
 * Sprint 3+4+5: Plantillas ampliadas + triggers + análisis + campañas
 */

const CONFIG = {
  TOKEN: 'feria-litoral-encargado-2026-secret-xyz789',
  CLAUDE_API_KEY: '',
  CLAUDE_MODEL: 'claude-sonnet-4-20250514',
  PROMOS_ID: '1ti5eysgjKqcpr6UahZcndr7bFXdbcdgfGtiMAItM13c',
  VOICEFLOW_ID: '11vmaoozVDw7bvCQ_hbHVQHs2_AhfnvdFARvJvo0O_ts',
  ALIAS_BANCARIO: 'feriadellitoral',
  BANCO: 'Santander Río',
  NOMBRE_NEGOCIO: 'Feria del Litoral',
  TELEFONO_ROBERTO: '5493425284562', // Para cierre diario
  FORM_PROMOS_URL: 'https://forms.gle/TU-FORM-AQUI', // Pasame el link real
  SHEETS: {
    ALQUILERES:'ALQUILERESAPP',PAGOS:'PAGOS',GASTOS:'GASTOS2',GASTOS_BASE:'GASTOSBASE',
    CAJA:'CAJA',AVISOS:'AVISOS',RETIROS:'RETIROS',RETIROS2:'RETIROS2',LITO_IA:'LITO IA',
    INFO:'INFO',VARIOS:'VARIOS',VARIOS2:'VARIOS2',COMPROBANTES:'COMPROBANTES',
    TOTALES:'TOTALES',CLAVES:'claves',AUDITORIA:'AUDITORIA',TELEFONOS:'TELEFONOS',
    RECORDATORIOS:'RECORDATORIOS',CIERRES_DIARIOS:'CIERRES_DIARIOS'
  }
};

// ═══════════ PLANTILLAS WHATSAPP (ampliadas) ═══════════
const PLANTILLAS = {
  // COBRANZAS
  amable_1: `¡Hola {nombre}! 👋

Te escribimos desde *Feria del Litoral* para recordarte el estado de cuenta del local {numero}.

📌 *Detalle del mes:*
• Alquiler: \${alquiler}
• Pagado: \${pagado}
• Saldo del mes: {deuda_txt}

📊 *Acumulado anterior:*
• Mora: \${mora}
• Intereses acumulados: \${intereses}

💰 *DEUDA TOTAL: \${total}*

El vencimiento es del 1 al 10. Después se aplican intereses automáticos.

¿Cuándo podés regularizarlo? 💙

Alias: {alias}

*Administración Feria del Litoral*`,

  amable_2: `¡Hola! 👋 ¿Cómo va todo por el local?

Te paso un recordatorio amistoso desde *Feria del Litoral*: estado de cuenta del local {numero} ({nombre}).

📌 *Resumen:*
• Alquiler del mes: \${alquiler}
• Pagado: \${pagado}
• Saldo del mes: {deuda_txt}
• Mora acumulada: \${mora}
• Intereses acumulados: \${intereses}

💰 *TOTAL: \${total}*

Si ya lo abonaste, avisanos 🙌
Alias: {alias}

*Feria del Litoral*`,

  firme_1: `Hola {nombre},

Te escribimos desde la administración de *Feria del Litoral*. El local {numero} acumula deuda significativa.

📊 *Estado de cuenta:*
• Alquiler del mes: \${alquiler}
• Pagado: \${pagado}
• Saldo del mes: {deuda_txt}
• Mora acumulada: \${mora}
• Intereses acumulados: \${intereses}

💰 *DEUDA TOTAL: \${total}*

Te pedimos que pases por administración para acordar un plan de pago, o respondas este mensaje.

Alias: {alias}

*Administración Feria del Litoral*`,

  firme_2: `Hola {nombre}, ¿cómo estás?

Te escribimos desde *Feria del Litoral* por la situación del local {numero}. Hay varios días de atraso.

📊 *Detalle:*
• Alquiler del mes: \${alquiler}
• Pagado: \${pagado}
• Saldo del mes: {deuda_txt}
• Mora: \${mora}
• Intereses acumulados: \${intereses}

💰 *DEUDA TOTAL: \${total}*

Necesitamos charlar para encontrar la solución. ¿Coordinamos esta semana? 🤝

Alias: {alias}

*Administración Feria del Litoral*`,

  final_1: `Estimado/a {nombre},

El local {numero} acumula deuda considerable, con varios meses de atraso.

📊 *Estado de cuenta:*
• Alquiler del mes: \${alquiler}
• Pagado: \${pagado}
• Saldo del mes: {deuda_txt}
• Mora acumulada: \${mora}
• Intereses acumulados: \${intereses}
• Deuda alquileres: \${total_alquileres}
• Deuda extraordinaria (llave/expensas/multas): \${deuda_extra}

💰 *DEUDA TOTAL COMBINADA: \${total}*

Es urgente que nos contactes para acordar una solución. De lo contrario, la administración evaluará las medidas correspondientes según el contrato firmado.

Esperamos tu llamada en las próximas 48 horas.

Alias: {alias}

*Administración Feria del Litoral*`,

  final_2: `{nombre}, necesitamos hablar.

📊 *Situación crítica del local {numero}:*
• Alquiler del mes: \${alquiler}
• Pagado: \${pagado}
• Saldo del mes: {deuda_txt}
• Mora acumulada: \${mora}
• Intereses acumulados (siguen creciendo): \${intereses}

💰 *DEUDA TOTAL: \${total}*

Los intereses se generan diariamente, cada día que pasa la deuda crece.

Pasá por administración esta semana antes de tomar decisiones más drásticas.

*Administración Feria del Litoral*`,

  vencimiento: `¡Hola {nombre}! 🔔

Te recordamos desde *Feria del Litoral* que MAÑANA es el último día sin intereses para abonar el alquiler. A partir del día 11 se aplican intereses automáticos.

📊 Local {numero}:
• Alquiler: \${alquiler}

Abonalo hoy sin recargos.
Alias: {alias}

*Feria del Litoral*`,

  felicitacion: `¡Hola {nombre}! 👏

Solo para decirte GRACIAS desde *Feria del Litoral* por mantener todo al día con el local {numero}. Sos un ejemplo 🙌

¡Sigamos creciendo juntos! 🚀

*Feria del Litoral*`,

  // PROMOS / MARKETING
  promo_recordatorio: `¡Hola {nombre}! 👋

Te escribimos desde *Feria del Litoral*. ¡Arrancó la semana! 🚀

📣 Es momento de cargar tu *promo de la semana* para destacarte en el asistente virtual.

🎯 Los locales que cargan promo cada semana venden hasta 30% más.

¡Buenas ventas! 💪

*Feria del Litoral*`,

  promo_motivacional: `¡Hola {nombre}! 💪

Mitad de semana en *Feria del Litoral*! 🚀

¿Ya pensaste qué promo subir? Te dejamos algunas ideas:

🎯 *2x1* en productos seleccionados
🎯 *Descuento especial* del 15-20% por compra
🎯 *Combo o pack* con precio promo
🎯 *Regalo* con tu compra

📈 Mostrale al público que tu local está activo, eso genera más visitas y ventas.

¡Vamos que se puede! 🔥

*Feria del Litoral*`,

  promo_inactivo: `¡Hola {nombre}! 👋

Desde *Feria del Litoral*: vimos que hace varias semanas que el local {numero} no carga promo.

🎯 Los locales que cargan cada semana venden mucho más.

¿Necesitás ayuda? Avisanos y te orientamos.

*Administración Feria del Litoral*`,

  promo_difusion: `¡Hola {nombre}! 🎉

Esta semana en *Feria del Litoral*, tu local {numero} tiene estas promos imperdibles:

{promo_texto}

📅 Te esperamos:
• Mié-Vie 17 a 21hs
• Sáb-Dom 10 a 21hs

¡Compartilo con tus clientes! 💪

*Feria del Litoral*`,

  evento_paseo: `¡Hola {nombre}! 🎉

Te recordamos desde *Feria del Litoral* que este fin de semana es *{evento}*.

📈 Día de alta circulación, aprovechá para:
✅ Tener stock al día
✅ Cargar promo especial en Lito
✅ Decorar la vidriera

¡Vamos por una venta récord! 💪

*Feria del Litoral*`,

  campania_qr: `¡Hola {nombre}! 📲

Te recordamos que el QR de *Ferialito* en tu vidriera ofrece 30% off a los clientes que lo escanean (efectivo).

📈 Asegurate que el QR esté visible y bien iluminado.

¡Más clientes para tu local! 🚀

*Feria del Litoral*`,

  // GESTIÓN
  bienvenida_nuevo: `¡Bienvenido/a a *Feria del Litoral*! 🎉

{nombre}, ya tenés tu local {numero} activo.

📌 Datos importantes:
• Alquiler: \${alquiler}/mes
• Vencimiento: del 1 al 10
• Alias: {alias}
• Horarios: Mié-Vie 17-21hs, Sáb-Dom 10-21hs

🤖 Sumate al sistema:
• App de alquileres para estado de cuenta
• Lito IA para cargar promos: {form_url}

*Feria del Litoral*`,

  aumento_alquiler: `Estimado/a {nombre},

Te informamos desde *Feria del Litoral* que a partir del mes próximo, el alquiler del local {numero} se ajusta de \${alquiler} al nuevo valor.

📋 Ajuste por inflación acumulada del semestre.

Cualquier consulta, pasá por administración.

*Administración Feria del Litoral*`,

  reunion_locatarios: `¡Hola {nombre}! 📅

Te convocamos desde *Feria del Litoral* a una reunión general de locatarios:

🗓️ {fecha_evento}
🕐 {hora_evento}
📍 En el local de administración

Temas a tratar: {tema_evento}

Es importante tu presencia. ¡Te esperamos! 🙌

*Administración Feria del Litoral*`,

  cambio_horario: `¡Hola {nombre}! ⏰

Te informamos desde *Feria del Litoral* un cambio en los horarios del paseo:

📅 Nuevo horario: {horario_nuevo}

Por favor ajustá tu apertura. Cualquier consulta avisanos.

*Administración Feria del Litoral*`,

  // OPERATIVAS
  mantenimiento: `¡Hola {nombre}! 🔧

Te avisamos desde *Feria del Litoral* que {fecha_evento} de {hora_evento} vendrá el técnico a {tema_evento} en tu local {numero}.

📌 Por favor estar presente o dejar acceso disponible.

Gracias 🙌

*Feria del Litoral*`,

  seguridad: `¡Hola {nombre}! 🚨

Te avisamos desde *Feria del Litoral* sobre un tema de seguridad:

{tema_evento}

Por favor seguí el protocolo y avisanos cualquier novedad.

*Administración Feria del Litoral*`,

  limpieza: `¡Hola {nombre}! 🧹

Recordatorio desde *Feria del Litoral*: por favor mantengamos limpio el frente del local {numero} y los pasillos.

🙌 La buena imagen del paseo nos beneficia a todos.

*Feria del Litoral*`,

  promocion_redes: `¡Hola {nombre}! 📸

Te avisamos desde *Feria del Litoral* que SUBIMOS TU LOCAL al Instagram @feriadellitoralok 🎉

Mirá la publicación y compartila para que llegue a más clientes.

¡Gracias por ser parte! 🙌

*Feria del Litoral*`,

  // ESPECIAL
  personalizado: `{mensaje_libre}

*Feria del Litoral*`
};

// ═══════════ ROUTER ═══════════
function doGet(e){return manejar(e,'GET');}
function doPost(e){return manejar(e,'POST');}

function manejar(e,m){
  try{
    const p=e.parameter||{};let b={};
    if(m==='POST'&&e.postData&&e.postData.contents)b=JSON.parse(e.postData.contents);
    const a=p.accion||b.accion;const t=p.token||b.token;
    if(t!==CONFIG.TOKEN)return resp({ok:false,error:'Token inválido'});
    
    switch(a){
      case 'ping':return resp({ok:true,mensaje:'EL ENCARGADO v5',fecha:new Date().toISOString()});
      // LECTURAS
      case 'listar_alquileres':return resp(listarAlquileres());
      case 'estado_caja':return resp(estadoCaja());
      case 'local':return resp(obtenerLocal(p.num||b.num));
      case 'pagos_local':return resp(pagosDeLocal(p.num||b.num));
      case 'avisos':return resp(listarAvisos());
      case 'gastos_recientes':return resp(gastosRecientes());
      case 'totales':return resp(obtenerTotales());
      case 'lito_ia':return resp(listarLitoIA());
      case 'morosos_top':return resp(morososTop(parseInt(p.cantidad||b.cantidad)||10));
      // PROMOS
      case 'listar_promos':return resp(listarPromos());
      case 'promos_local':return resp(promosDeLocal(p.num||b.num,p.nombre||b.nombre));
      case 'locales_sin_promo':return resp(localesSinPromo());
      case 'buscar_promo':return resp(buscarPromo(p.q||b.q));
      case 'voiceflow_local':return resp(voiceflowLocal(p.nombre||b.nombre));
      case 'voiceflow_buscar':return resp(voiceflowBuscar(p.q||b.q));
      case 'info_local_completa':return resp(infoLocalCompleta(p.num||b.num));
      // WHATSAPP
      case 'generar_link_whatsapp':return resp(generarLinkWA(b.local?b:p));
      case 'generar_link_personalizado':return resp(generarLinkPersonalizado(b));
      case 'generar_link_difusion_promo':return resp(generarLinkDifusionPromo(b.local?b:p));
      case 'links_morosos':return resp(linksMorosos(b.cantidad?b:p));
      case 'links_sin_promo':return resp(linksSinPromo(b.operador?b:p));
      case 'links_motivacional':return resp(linksMotivacional(b.operador?b:p));
      case 'links_difusion_promos':return resp(linksDifusionPromos(b.operador?b:p));
      case 'links_evento':return resp(linksEvento(b));
      case 'plantillas':return resp({ok:true,data:Object.keys(PLANTILLAS)});
      // ESCRITURAS
      case 'cargar_pago':return resp(cargarPago(b));
      case 'cargar_gasto':return resp(cargarGasto(b));
      case 'ajustar_caja':return resp(ajustarCaja(b));
      // CAJA PRO
      case 'estado_caja_dia':return resp(estadoCajaDia());
      case 'movimientos_dia':return resp(movimientosDia(p.fecha||b.fecha, p.fecha_hasta||b.fecha_hasta));
      case 'abrir_caja':return resp(abrirCaja(b));
      case 'cerrar_caja':return resp(cerrarCaja(b));
      case 'historico_cierres':return resp(historicoCierres(parseInt(p.cantidad||b.cantidad)||30));
      // CONTRATOS
      case 'contratos_listar':return resp(contratosListar());
      case 'contrato_local':return resp(contratoLocal(p.num||b.num));
      case 'contratos_alertas':return resp(contratosAlertas());
      case 'cargar_contrato':return resp(cargarContrato(b));
      case 'borrar_contrato':return resp(borrarContrato(b));
      case 'cargar_aviso':return resp(cargarAviso(b));
      case 'cargar_retiro':return resp(cargarRetiro(b));
      case 'anular_pago':return resp(anularPago(b));
      case 'ajustar_mora':return resp(ajustarMora(b));
      case 'cambiar_inquilino':return resp(cambiarInquilino(b));
      case 'editar_local':return resp(editarLocal(b));
      case 'marcar_vacante':return resp(marcarVacante(b));
      case 'guardar_telefono':return resp(guardarTelefono(b));
      case 'cargar_promo':return resp(cargarPromo(b));
      case 'borrar_promo':return resp(borrarPromo(b));
      // ANÁLISIS
      case 'analisis_general':return resp(analisisGeneral());
      case 'morosidad_grafico':return resp(morosidadGrafico());
      case 'promos_grafico':return resp(promosGrafico());
      case 'sugerencias_mix':return resp(sugerenciasMix());
      case 'recordatorios':return resp(listarRecordatorios());
      case 'auditoria':return resp(listarAuditoria());
      // TRIGGERS (ejecutables manualmente para test)
      case 'cierre_diario_manual':return resp(cierreDiario());
      case 'aviso_vencimiento_manual':return resp(avisoVencimientoMasivo());
      
      case 'chat':return resp(chatClaude(b));
      // === CALENDARIO ===
      case 'calendario_listar':return resp(calendarioListar());
      case 'calendario_agregar':return resp(calendarioAgregar(b));
      case 'calendario_actualizar':return resp(calendarioActualizar(b));
      case 'calendario_borrar':return resp(calendarioBorrar(b));
      case 'calendario_proximos':return resp(calendarioProximos(parseInt(p.dias||b.dias)||20));
      // === REUNIONES ===
      case 'reuniones_listar':return resp(reunionesListar());
      case 'reuniones_crear':return resp(reunionesCrear(b));
      case 'reuniones_actualizar':return resp(reunionesActualizar(b));
      case 'reuniones_borrar':return resp(reunionesBorrar(b));
      case 'objetivo_agregar':return resp(objetivoAgregar(b));
      case 'objetivo_toggle':return resp(objetivoToggle(b));
      case 'objetivo_borrar':return resp(objetivoBorrar(b));
      case 'reuniones_pendientes':return resp(reunionesPendientes());
      // === ANULAR GASTO + COMPROBANTES ===
      case 'anular_gasto':return resp(anularGasto(b));
      case 'comprobantes_listar':return resp(comprobantesListar(parseInt(p.dias||b.dias)||30));
      // === SORTEOS ===
      case 'sorteos_listar':return resp(sorteosListar());
      case 'sorteo_guardar':return resp(sorteoGuardar(b));
      case 'sorteo_borrar':return resp(sorteoBorrar(b));
      default:return resp({ok:false,error:'Acción no reconocida: '+a});
    }
  }catch(err){return resp({ok:false,error:err.message});}
}

function resp(d){return ContentService.createTextOutput(JSON.stringify(d)).setMimeType(ContentService.MimeType.JSON);}

// ═══════════ HELPERS ═══════════
function getSheet(n){const s=SpreadsheetApp.getActive().getSheetByName(n);if(!s)throw new Error('No existe: '+n);return s;}
function dataToObj(d){if(d.length<2)return[];const h=d[0];return d.slice(1).map(r=>{const o={};h.forEach((k,i)=>o[k]=r[i]);return o;});}
function esLocalValido(r,h){const il=h.indexOf('LOCAL'),in_=h.indexOf('NOMBRE');const l=r[il],n=r[in_];if(l===null||l===undefined||l==='')return false;const nl=Number(l);if(isNaN(nl)||nl<=0||nl>200)return false;if(!n||String(n).trim()==='')return false;return true;}
function generarClaveNueva(){const s=getSheet(CONFIG.SHEETS.CLAVES);const d=s.getDataRange().getValues();const u=new Set(d.slice(1).map(r=>String(r[1])));let c;do{c=String(Math.floor(1000+Math.random()*9000));}while(u.has(c));return c;}
function formatMoney(n){if(n===undefined||n===null||isNaN(n))return'0';return Number(n).toLocaleString('es-AR');}
function reemplazarVars(p,v){let t=p;Object.keys(v).forEach(k=>{t=t.replace(new RegExp('\\{'+k+'\\}','g'),v[k]);});return t;}

// ═══════════ LECTURAS BÁSICAS ═══════════
function listarAlquileres(){const s=getSheet(CONFIG.SHEETS.ALQUILERES);const d=s.getDataRange().getValues();const h=d[0];return{ok:true,data:d.slice(1).filter(r=>esLocalValido(r,h)).map(r=>{const o={};h.forEach((k,i)=>o[k]=r[i]);return o;}),total:d.length-1};}
function estadoCaja(){const d=getSheet(CONFIG.SHEETS.CAJA).getDataRange().getValues();if(d.length<2)return{ok:true,data:null};const h=d[0],u=d[d.length-1],o={};h.forEach((k,i)=>o[k]=u[i]);return{ok:true,data:o};}
function obtenerLocal(num){if(!num)return{ok:false,error:'Falta num'};const s=getSheet(CONFIG.SHEETS.ALQUILERES);const d=s.getDataRange().getValues();const h=d[0];for(let i=1;i<d.length;i++){if(esLocalValido(d[i],h)&&String(d[i][0])===String(num)){const o={_fila:i+1};h.forEach((k,j)=>o[k]=d[i][j]);return{ok:true,data:o};}}return{ok:false,error:'No encontrado'};}
function pagosDeLocal(num){if(!num)return{ok:false,error:'Falta num'};const s=getSheet(CONFIG.SHEETS.PAGOS);const d=s.getDataRange().getValues();const h=d[0];return{ok:true,data:d.slice(1).filter(r=>String(r[1])===String(num)).map(r=>{const o={};h.forEach((k,i)=>o[k]=r[i]);return o;})};}
function listarAvisos(){return{ok:true,data:dataToObj(getSheet(CONFIG.SHEETS.AVISOS).getDataRange().getValues())};}
function gastosRecientes(){
  const sheet = getSheet(CONFIG.SHEETS.GASTOS);
  const data = sheet.getDataRange().getValues();
  if(data.length<2) return {ok:true, data:[]};
  const h = data[0];
  const iDet = h.indexOf('DETALLE');
  const iObs = h.indexOf('OBSERVACION');
  const iMto = h.indexOf('ENTREGAS');
  const iFec = h.indexOf('FECHA');
  const iMet = h.indexOf('METODO');
  
  const gastos = data.slice(1).map(r=>{
    const codigo = String(r[iDet]||'').trim();
    const observ = String(r[iObs]||'').trim();
    // El "detalle real" está en OBSERVACION. Si está vacía, usa el contenido de DETALLE (columna B) directamente.
    const detalleReal = observ || codigo || 'Sin detalle';
    return {
      DETALLE: detalleReal,
      CODIGO: codigo,
      MONTO: Number(r[iMto])||0,
      FECHA: r[iFec],
      METODO: r[iMet] || 'EFECTIVO',
      OBSERVACION: observ
    };
  }).filter(g=>g.MONTO!==0);
  
  return {ok:true, data:gastos.slice(-50), total:gastos.length};
}

// Cargar gasto MEJORADO con categoría y beneficiario
function cargarGasto(b){
  const {detalle, monto, metodo, categoria, beneficiario, observacion, cargadoPor} = b;
  if(!detalle||!monto) return {ok:false, error:'Faltan datos'};
  const s = getSheet(CONFIG.SHEETS.GASTOS);
  const id = Utilities.getUuid().substring(0,8);
  const f = Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy');
  
  // Construir OBSERVACION completa con categoría + beneficiario + detalle
  const obsCompleta = [
    categoria ? `[${categoria}]` : '',
    beneficiario ? beneficiario : '',
    detalle,
    observacion || ''
  ].filter(x=>x).join(' · ');
  
  s.appendRow([
    id,
    detalle, // DETALLE corto
    monto, // TOTAL
    monto, // ENTREGAS  
    '', // SALDO
    f, // FECHA
    obsCompleta, // OBSERVACION (con todo)
    (metodo||'EFECTIVO').toUpperCase(),
    '' // NUEVO TOTAL
  ]);
  auditoria('CARGAR_GASTO', cargadoPor||'?', `${detalle}: $${monto}${categoria?' ['+categoria+']':''}${beneficiario?' - '+beneficiario:''}`);
  return {ok:true, mensaje:'Gasto cargado', id};
}

// Ajuste manual de caja
function ajustarCaja(b){
  const {nuevoSaldo, motivo, cargadoPor, campo} = b;
  if(nuevoSaldo===undefined||!motivo||!cargadoPor) return {ok:false, error:'Faltan datos'};
  const s = getSheet(CONFIG.SHEETS.CAJA);
  const data = s.getDataRange().getValues();
  if(data.length<2) return {ok:false, error:'Hoja CAJA vacía'};
  const h = data[0];
  const idxCampo = h.indexOf(campo||'CAJA');
  if(idxCampo===-1) return {ok:false, error:'Campo '+campo+' no existe en CAJA'};
  const ultimaFila = data.length;
  const anterior = data[ultimaFila-1][idxCampo];
  s.getRange(ultimaFila, idxCampo+1).setValue(nuevoSaldo);
  auditoria('AJUSTE_CAJA', cargadoPor, `${campo||'CAJA'}: ${anterior} → ${nuevoSaldo}. Motivo: ${motivo}`);
  return {ok:true, anterior, nuevo:nuevoSaldo, campo:campo||'CAJA'};
}
function obtenerTotales(){const d=getSheet(CONFIG.SHEETS.TOTALES).getDataRange().getValues();if(d.length<2)return{ok:true,data:null};const h=d[0],o={};h.forEach((k,i)=>o[k]=d[d.length-1][i]);return{ok:true,data:o};}
function listarLitoIA(){return{ok:true,data:dataToObj(getSheet(CONFIG.SHEETS.LITO_IA).getDataRange().getValues())};}
function morososTop(cant){const s=getSheet(CONFIG.SHEETS.ALQUILERES);const d=s.getDataRange().getValues();const h=d[0];const m=d.slice(1).filter(r=>esLocalValido(r,h)).map(r=>{const o={};h.forEach((k,i)=>o[k]=r[i]);return o;}).filter(o=>Number(o['DEUDA TOTAL'])>0).sort((a,b)=>Number(b['DEUDA TOTAL'])-Number(a['DEUDA TOTAL'])).slice(0,cant);return{ok:true,data:m,total:m.length};}
function listarRecordatorios(){try{return{ok:true,data:dataToObj(getSheet(CONFIG.SHEETS.RECORDATORIOS).getDataRange().getValues()).slice(-100).reverse()};}catch(e){return{ok:false,error:e.message};}}
function listarAuditoria(){try{return{ok:true,data:dataToObj(getSheet(CONFIG.SHEETS.AUDITORIA).getDataRange().getValues()).slice(-100).reverse()};}catch(e){return{ok:false,error:e.message};}}

// ═══════════ PROMOS (v5: lee hojas individuales) ═══════════
function getUltimoMartes03(){const a=new Date();const d=new Date(a.getFullYear(),a.getMonth(),a.getDate(),3,0,0);let dia=d.getDay(),r=(dia-2+7)%7;if(r===0&&a.getHours()<3)r=7;d.setDate(d.getDate()-r);return d;}

function listarPromos(){
  try{
    const ss=SpreadsheetApp.openById(CONFIG.PROMOS_ID);
    const sheets=ss.getSheets();
    const promos=[];
    const reset=getUltimoMartes03();
    sheets.forEach(sh=>{
      const n=sh.getName();
      if(n.toUpperCase()==='PROMOSGENERALES')return;
      const d=sh.getDataRange().getValues();
      if(d.length<2)return;
      let activa=null,fecha=null;
      for(let i=d.length-1;i>=1;i--){
        const m=d[i][0],p=String(d[i][1]||'').trim();
        if(!m||!p)continue;
        if(p.toUpperCase()==='SIN PROMO'||p.toUpperCase()==='¿CUAL ES TU PROMO?')continue;
        let f=null;
        if(m instanceof Date)f=m;
        else if(typeof m==='string'&&m.includes('/')){
          try{const pt=m.split(' '),fp=pt[0].split('/'),hp=(pt[1]||'0:0:0').split(':');f=new Date(parseInt(fp[2]),parseInt(fp[1])-1,parseInt(fp[0]),parseInt(hp[0]||0),parseInt(hp[1]||0));}catch(e){}
        }
        if(f&&f>=reset){activa=p;fecha=f;break;}
      }
      if(activa)promos.push({local:n,promo:activa,fecha:fecha?Utilities.formatDate(fecha,'GMT-3','dd/MM/yyyy HH:mm'):'',link:''});
    });
    return{ok:true,data:promos,total:promos.length,ultimoReset:Utilities.formatDate(reset,'GMT-3','dd/MM/yyyy HH:mm')};
  }catch(err){return{ok:false,error:err.message};}
}

function localesSinPromo(){
  try{
    const r=listarPromos();
    if(!r.ok)return r;
    const conPromoKeys=new Set();
    r.data.forEach(p=>conPromoKeys.add(String(p.local||'').toUpperCase().replace(/[^A-Z]/g,'')));
    const sA=getSheet(CONFIG.SHEETS.ALQUILERES);
    const dA=sA.getDataRange().getValues();const h=dA[0];
    const sinPromo=[];
    const conPromo=r.data.map(p=>({local:p.local,promo:p.promo,fecha:p.fecha}));
    for(let i=1;i<dA.length;i++){
      if(!esLocalValido(dA[i],h))continue;
      const num=dA[i][h.indexOf('LOCAL')];
      const nom=dA[i][h.indexOf('NOMBRE')];
      const nL=String(nom||'').replace(/^\d+\s*-\s*/,'').trim();
      const nK=nL.toUpperCase().replace(/[^A-Z]/g,'');
      let match=false;
      conPromoKeys.forEach(k=>{if(nK.length>2&&(k===nK||k.includes(nK)||nK.includes(k)))match=true;});
      if(!match)sinPromo.push({local:num,nombre:nL});
    }
    return{ok:true,sin_promo:sinPromo,con_promo:conPromo,total_sin:sinPromo.length,total_con:conPromo.length,ultimoReset:r.ultimoReset};
  }catch(err){return{ok:false,error:err.message};}
}

function promosDeLocal(num,nombre){
  try{
    const r=listarPromos();
    if(!r.ok)return r;
    const nK=String(nombre||'').toUpperCase().replace(/[^A-Z]/g,'');
    if(!nK)return{ok:true,data:[]};
    const found=r.data.find(p=>{const lK=String(p.local||'').toUpperCase().replace(/[^A-Z]/g,'');return lK===nK||lK.includes(nK)||nK.includes(lK);});
    return{ok:true,data:found?[{local:found.local,promo:found.promo,fecha:found.fecha,tiene_promo:true}]:[]};
  }catch(err){return{ok:false,error:err.message};}
}

function buscarPromo(q){if(!q)return{ok:false,error:'Falta q'};const r=listarPromos();if(!r.ok)return r;const qL=q.toLowerCase();return{ok:true,data:r.data.filter(p=>p.promo.toLowerCase().includes(qL)||p.local.toLowerCase().includes(qL))};}

function voiceflowLocal(nombre){
  if(!nombre)return{ok:false,error:'Falta nombre'};
  try{
    const ss=SpreadsheetApp.openById(CONFIG.VOICEFLOW_ID);
    const sheet=ss.getSheets()[0];
    const data=sheet.getDataRange().getValues();
    const limpiar=s=>String(s||'').toUpperCase().replace(/[^A-Z]/g,'').trim();
    const nU=limpiar(nombre);
    if(!nU)return{ok:false,error:'Nombre vacío'};
    let enc=false,desc=[];
    for(let i=0;i<data.length;i++){
      const cell=String(data[i][0]||'').trim();
      const cL=limpiar(cell);
      if(cell.endsWith(':')||cell.endsWith(': ')){
        if(enc)break;
        if(cL&&(cL===nU||cL.includes(nU)||nU.includes(cL)))enc=true;
      }else if(enc&&cell)desc.push(cell);
    }
    if(enc)return{ok:true,data:{nombre,descripcion:desc.join('\n'),tiene_catalogo:desc.length>0}};
    return{ok:false,error:'No encontrado'};
  }catch(err){return{ok:false,error:err.message};}
}

function voiceflowBuscar(q){
  if(!q)return{ok:false,error:'Falta q'};
  try{
    const ss=SpreadsheetApp.openById(CONFIG.VOICEFLOW_ID);
    const sheet=ss.getSheets()[0];
    const data=sheet.getDataRange().getValues();
    const qL=q.toLowerCase();const res=[];let actual='';
    for(let i=0;i<data.length;i++){
      const cell=String(data[i][0]||'').trim();
      if(cell.endsWith(':'))actual=cell.replace(':','').trim();
      else if(cell.toLowerCase().includes(qL)&&actual)res.push({local:actual,descripcion:cell});
    }
    return{ok:true,data:res,total:res.length};
  }catch(err){return{ok:false,error:err.message};}
}

function infoLocalCompleta(num){
  if(!num)return{ok:false,error:'Falta num'};
  const r={ok:true,local:null,alquiler:null,pagos:[],deuda_extraordinaria:null,promo:null,catalogo:null,telefono:null,deuda_combinada:0};
  const lD=obtenerLocal(num);if(lD.ok){r.alquiler=lD.data;r.local=num;}
  const pD=pagosDeLocal(num);if(pD.ok)r.pagos=pD.data||[];
  try{const sV=getSheet(CONFIG.SHEETS.VARIOS);const dV=sV.getDataRange().getValues();const hV=dV[0];for(let i=1;i<dV.length;i++){if(String(dV[i][1])===String(num)){const o={};hV.forEach((k,j)=>o[k]=dV[i][j]);r.deuda_extraordinaria=o;break;}}}catch(e){}
  const nL=r.alquiler?String(r.alquiler.NOMBRE||'').replace(/^\d+\s*-\s*/,'').trim():'';
  if(nL){const pmD=promosDeLocal(num,nL);if(pmD.ok&&pmD.data&&pmD.data.length>0)r.promo=pmD.data[0];const cD=voiceflowLocal(nL);if(cD.ok)r.catalogo=cD.data;}
  r.telefono=getTelefono(num);
  const dA=r.alquiler?Number(r.alquiler['DEUDA TOTAL']||0):0;
  let dE=0;if(r.deuda_extraordinaria){const e=r.deuda_extraordinaria;const t=(Number(e.LLAVE)||0)+(Number(e.EXPENSAS)||0)+(Number(e.MULTAS)||0)-(Number(e.PAGADO)||0);dE=t>0?t:0;}
  r.deuda_combinada=dA+dE;
  return r;
}

// ═══════════ WHATSAPP ═══════════
function getTelefono(num){try{const s=SpreadsheetApp.getActive().getSheetByName(CONFIG.SHEETS.TELEFONOS);if(!s)return null;const d=s.getDataRange().getValues();for(let i=1;i<d.length;i++){if(String(d[i][0])===String(num)&&d[i][2])return String(d[i][2]).replace(/\D/g,'');}return null;}catch(e){return null;}}

function generarLinkWA(body){
  const{local,plantilla,operador,telefonoManual,registrar,extras}=body;
  if(!local)return{ok:false,error:'Falta local'};
  if(!plantilla||!PLANTILLAS[plantilla])return{ok:false,error:'Plantilla inválida'};
  const lD=obtenerLocal(local);if(!lD.ok)return lD;
  const l=lD.data;
  const tel=telefonoManual||getTelefono(local);
  if(!tel)return{ok:false,error:'Sin teléfono cargado para local '+local};
  const nL=String(l.NOMBRE||'').replace(/^\d+\s*-\s*/,'').trim();
  
  // Sumar deuda extraordinaria (VARIOS) si existe
  let deudaExtra = 0;
  let extraDesc = '';
  try{
    const sV=getSheet(CONFIG.SHEETS.VARIOS);
    const dV=sV.getDataRange().getValues();
    for(let i=1;i<dV.length;i++){
      if(String(dV[i][1])===String(local)){
        const llave=Number(dV[i][2])||0;
        const expensas=Number(dV[i][3])||0;
        const multas=Number(dV[i][4])||0;
        const pagadoExtra=Number(dV[i][5])||0;
        deudaExtra=Math.max(0,llave+expensas+multas-pagadoExtra);
        if(deudaExtra>0){
          const partes=[];
          if(llave>0)partes.push(`Llave $${formatMoney(llave)}`);
          if(expensas>0)partes.push(`Expensas $${formatMoney(expensas)}`);
          if(multas>0)partes.push(`Multas $${formatMoney(multas)}`);
          extraDesc=partes.join(' · ');
        }
        break;
      }
    }
  }catch(e){}
  
  // 🔥 FIX: usar INTERESES ACUMULADO (no INTERESES que suele estar vacío)
  const interesesReales = Number(l['INTERESES ACUMULADO'])||Number(l.INTERESES)||0;
  const deudaCorr = Number(l.DEUDA)||0;
  const deudaAFavor = deudaCorr < 0;
  const deudaAlquileres = Number(l['DEUDA TOTAL'])||0;
  const totalCombinado = deudaAlquileres + deudaExtra;
  
  // Formatear deuda corriente: si es negativa, mostrar "a favor"
  const deudaTxt = deudaAFavor 
    ? `A FAVOR $${formatMoney(Math.abs(deudaCorr))}` 
    : `$${formatMoney(deudaCorr)}`;
  
  const vars={
    nombre:nL,numero:local,
    alquiler:formatMoney(l['ALQUILER ACTUAL']),
    pagado:formatMoney(l.PAGADO),
    deuda:deudaAFavor ? `-${formatMoney(Math.abs(deudaCorr))}` : formatMoney(deudaCorr),
    deuda_txt: deudaTxt, // versión con texto "A FAVOR"
    mora:formatMoney(l.MORA),
    intereses:formatMoney(interesesReales), // ahora trae el valor real
    total:formatMoney(totalCombinado),
    total_alquileres:formatMoney(deudaAlquileres),
    deuda_extra:formatMoney(deudaExtra),
    extra_desc:extraDesc,
    fecha:Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy'),
    operador:operador||'la administración',
    alias:CONFIG.ALIAS_BANCARIO,
    form_url:CONFIG.FORM_PROMOS_URL,
    fecha_evento:extras?.fecha_evento||'',
    hora_evento:extras?.hora_evento||'',
    tema_evento:extras?.tema_evento||'',
    horario_nuevo:extras?.horario_nuevo||'',
    evento:extras?.evento||'',
    promo_texto:extras?.promo_texto||'',
    mensaje_libre:extras?.mensaje_libre||''
  };
  const msg=reemplazarVars(PLANTILLAS[plantilla],vars);
  const link=`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`;
  if(registrar){try{const s=SpreadsheetApp.getActive().getSheetByName(CONFIG.SHEETS.RECORDATORIOS);if(s){const f=Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy HH:mm:ss');s.appendRow([f,local,nL,plantilla,operador||'',tel,'WhatsApp']);}}catch(e){}}
  return{ok:true,link,mensaje:msg,telefono:tel,nombre:nL,local,plantilla};
}

function generarLinkPersonalizado(body){
  const{local,mensajeLibre,operador}=body;
  if(!local||!mensajeLibre)return{ok:false,error:'Faltan datos (local, mensajeLibre)'};
  return generarLinkWA({local,plantilla:'personalizado',operador,extras:{mensaje_libre:mensajeLibre}});
}

function generarLinkDifusionPromo(body){
  const{local,operador}=body;
  if(!local)return{ok:false,error:'Falta local'};
  const lD=obtenerLocal(local);if(!lD.ok)return lD;
  const nL=String(lD.data.NOMBRE||'').replace(/^\d+\s*-\s*/,'').trim();
  const pmD=promosDeLocal(local,nL);
  const promoTxt=(pmD.ok&&pmD.data&&pmD.data.length>0)?pmD.data[0].promo:'(sin promo cargada esta semana)';
  return generarLinkWA({local,plantilla:'promo_difusion',operador,extras:{promo_texto:promoTxt}});
}

function linksMorosos(body){
  const{tono,cantidad,operador}=body;
  const max=parseInt(cantidad)||10;
  const top=morososTop(max);if(!top.ok)return top;
  const res=[];
  top.data.forEach(m=>{
    let pl='amable_1';
    if(tono==='auto'){
      if(m['DEUDA TOTAL']>3000000)pl='final_1';
      else if(m['DEUDA TOTAL']>1000000)pl='firme_1';
    }else if(tono==='amable')pl='amable_1';else if(tono==='firme')pl='firme_1';else if(tono==='final')pl='final_1';
    const r=generarLinkWA({local:m.LOCAL,plantilla:pl,operador});
    res.push({local:m.LOCAL,nombre:m.NOMBRE,deuda_total:m['DEUDA TOTAL'],plantilla_usada:pl,tiene_telefono:r.ok,link:r.ok?r.link:null,mensaje:r.ok?r.mensaje:null,telefono:r.ok?r.telefono:null,error:r.ok?null:r.error});
  });
  return{ok:true,total:res.length,con_telefono:res.filter(r=>r.tiene_telefono).length,sin_telefono:res.filter(r=>!r.tiene_telefono).length,data:res};
}

function linksSinPromo(body){
  const{operador}=body;
  const r=localesSinPromo();if(!r.ok)return r;
  const res=[];
  r.sin_promo.forEach(loc=>{
    const lk=generarLinkWA({local:loc.local,plantilla:'promo_recordatorio',operador});
    res.push({local:loc.local,nombre:loc.nombre,tiene_telefono:lk.ok,link:lk.ok?lk.link:null,mensaje:lk.ok?lk.mensaje:null,telefono:lk.ok?lk.telefono:null,error:lk.ok?null:lk.error});
  });
  return{ok:true,total:res.length,con_telefono:res.filter(r=>r.tiene_telefono).length,sin_telefono:res.filter(r=>!r.tiene_telefono).length,data:res};
}

// Mensaje motivacional para media semana - va a TODOS los locales activos
function linksMotivacional(body){
  const{operador} = body;
  const sA = getSheet(CONFIG.SHEETS.ALQUILERES);
  const dA = sA.getDataRange().getValues();
  const h = dA[0];
  const res = [];
  for(let i=1; i<dA.length; i++){
    if(!esLocalValido(dA[i],h)) continue;
    const num = dA[i][h.indexOf('LOCAL')];
    const lk = generarLinkWA({local:num, plantilla:'promo_motivacional', operador});
    const nombre = String(dA[i][h.indexOf('NOMBRE')]||'').replace(/^\d+\s*-\s*/,'').trim();
    res.push({
      local: num,
      nombre,
      tiene_telefono: lk.ok,
      link: lk.ok?lk.link:null,
      mensaje: lk.ok?lk.mensaje:null,
      telefono: lk.ok?lk.telefono:null,
      error: lk.ok?null:lk.error
    });
  }
  return {ok:true, total:res.length, con_telefono:res.filter(r=>r.tiene_telefono).length, sin_telefono:res.filter(r=>!r.tiene_telefono).length, data:res};
}

function linksDifusionPromos(body){
  const{operador}=body;
  const r=listarPromos();if(!r.ok)return r;
  const sA=getSheet(CONFIG.SHEETS.ALQUILERES);const dA=sA.getDataRange().getValues();const h=dA[0];
  const res=[];
  r.data.forEach(p=>{
    // Buscar el LOCAL number por nombre
    const pK=String(p.local||'').toUpperCase().replace(/[^A-Z]/g,'');
    let localNum=null;
    for(let i=1;i<dA.length;i++){
      if(!esLocalValido(dA[i],h))continue;
      const nom=dA[i][h.indexOf('NOMBRE')];
      const nK=String(nom||'').replace(/^\d+\s*-\s*/,'').toUpperCase().replace(/[^A-Z]/g,'');
      if(nK&&pK&&(nK===pK||nK.includes(pK)||pK.includes(nK))){localNum=dA[i][h.indexOf('LOCAL')];break;}
    }
    if(!localNum){res.push({local:null,nombre:p.local,promo:p.promo,tiene_telefono:false,error:'Local no matcheado'});return;}
    const lk=generarLinkWA({local:localNum,plantilla:'promo_difusion',operador,extras:{promo_texto:p.promo}});
    res.push({local:localNum,nombre:p.local,promo:p.promo,tiene_telefono:lk.ok,link:lk.ok?lk.link:null,mensaje:lk.ok?lk.mensaje:null,telefono:lk.ok?lk.telefono:null,error:lk.ok?null:lk.error});
  });
  return{ok:true,total:res.length,con_telefono:res.filter(r=>r.tiene_telefono).length,data:res};
}

function linksEvento(body){
  const{evento,operador,soloMorosos}=body;
  if(!evento)return{ok:false,error:'Falta nombre del evento'};
  const sA=getSheet(CONFIG.SHEETS.ALQUILERES);const dA=sA.getDataRange().getValues();const h=dA[0];
  const res=[];
  for(let i=1;i<dA.length;i++){
    if(!esLocalValido(dA[i],h))continue;
    const num=dA[i][h.indexOf('LOCAL')];
    const dt=Number(dA[i][h.indexOf('DEUDA TOTAL')]||0);
    if(soloMorosos&&dt<=0)continue;
    const lk=generarLinkWA({local:num,plantilla:'evento_paseo',operador,extras:{evento}});
    if(lk.ok)res.push({local:num,link:lk.link,mensaje:lk.mensaje,telefono:lk.telefono});
  }
  return{ok:true,total:res.length,data:res};
}

function guardarTelefono(body){
  const{local,telefono,responsable,notas,cargadoPor}=body;
  if(!local||!telefono)return{ok:false,error:'Faltan datos'};
  const tL=String(telefono).replace(/\D/g,'');
  if(tL.length<8)return{ok:false,error:'Tel inválido'};
  let s=SpreadsheetApp.getActive().getSheetByName(CONFIG.SHEETS.TELEFONOS);
  if(!s)return{ok:false,error:'Falta hoja TELEFONOS'};
  const d=s.getDataRange().getValues();
  const f=Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy');
  for(let i=1;i<d.length;i++){
    if(String(d[i][0])===String(local)){
      s.getRange(i+1,3).setValue(tL);
      if(responsable)s.getRange(i+1,4).setValue(responsable);
      if(notas)s.getRange(i+1,5).setValue(notas);
      s.getRange(i+1,6).setValue(f);
      auditoria('GUARDAR_TELEFONO',cargadoPor||'?',`Local ${local}: ${tL}`);
      return{ok:true,mensaje:'Tel actualizado',local,telefono:tL};
    }
  }
  const n=obtenerLocal(local);
  s.appendRow([local,n.ok?n.data.NOMBRE:'',tL,responsable||'',notas||'',f]);
  return{ok:true,mensaje:'Tel agregado',local,telefono:tL};
}

// ═══════════ ESCRITURAS ═══════════
function cargarPago(b){
  const{local,clave,monto,metodo,cargadoPor,observaciones}=b;
  if(!local||!monto||monto<=0||!cargadoPor)return{ok:false,error:'Faltan datos'};
  const s=getSheet(CONFIG.SHEETS.PAGOS);
  const id=Utilities.getUuid().substring(0,8);
  // Punto 3: fecha solo dd/MM/yyyy (sin hora) para que AppSheet la vincule
  const f=Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy');
  // Punto 2: si no vino la clave del HTML, buscarla en ALQUILERESAPP por número de local
  let claveFinal = clave || '';
  if(!claveFinal){
    try{
      const sA = getSheet(CONFIG.SHEETS.ALQUILERES);
      const dA = sA.getDataRange().getValues();
      const hA = dA[0];
      const iLocal = hA.indexOf('LOCAL');
      const iClave = hA.indexOf('CLAVE');
      if(iLocal>=0 && iClave>=0){
        for(let i=1;i<dA.length;i++){
          if(String(dA[i][iLocal])===String(local)){
            claveFinal = dA[i][iClave] || '';
            break;
          }
        }
      }
    }catch(e){ /* si falla la búsqueda, seguimos con clave vacía y no rompemos el pago */ }
  }
  s.appendRow([id,local,claveFinal,f,monto,(metodo||'EFECTIVO').toUpperCase(),cargadoPor.toUpperCase(),observaciones||'']);
  auditoria('CARGAR_PAGO',cargadoPor,`L${local}: $${monto}`);
  return{ok:true,mensaje:'Pago cargado',id,fecha:f,clave:claveFinal};
}
function cargarAviso(b){const{mensaje,cargadoPor}=b;if(!mensaje)return{ok:false,error:'Falta mensaje'};const s=getSheet(CONFIG.SHEETS.AVISOS);const id=Utilities.getUuid().substring(0,8);const f=Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy HH:mm:ss');s.appendRow([id,mensaje,f]);auditoria('CARGAR_AVISO',cargadoPor||'?',mensaje.substring(0,50));return{ok:true,mensaje:'Publicado',id};}
function cargarRetiro(b){
  const{nombre,monto,codigo,motivo,cargadoPor}=b;
  if(!nombre||!monto||!codigo) return {ok:false,error:'Faltan datos (nombre, monto, codigo)'};
  if(Number(monto)<=0) return {ok:false,error:'Monto inválido'};
  const s = getSheet(CONFIG.SHEETS.RETIROS);
  const id = Utilities.getUuid().substring(0,8);
  const f = Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy');
  // Estructura: ID | FECHA | RETIRO | (vacío) | NOMBRE/CODIGO | MOTIVO (opcional)
  const h = s.getDataRange().getValues()[0];
  const fila = new Array(h.length).fill('');
  const setCol = (nombre, valor)=>{ const i = h.indexOf(nombre); if(i>=0) fila[i] = valor; };
  // Si no encuentra cols por nombre, usa orden conocido
  if(h.indexOf('FECHA')<0){
    s.appendRow([id, f, Number(monto), '', codigo, motivo||'']);
  } else {
    setCol('ID', id);
    setCol('FECHA', f);
    setCol('RETIRO', Number(monto));
    setCol('NOMBRE', codigo);
    if(h.indexOf('MOTIVO')>=0) setCol('MOTIVO', motivo||'');
    else if(h.indexOf('OBSERVACION')>=0) setCol('OBSERVACION', motivo||'');
    s.appendRow(fila);
  }
  auditoria('CARGAR_RETIRO', cargadoPor||nombre, `${nombre}${motivo?' · '+motivo:''}: $${monto}`);
  return {ok:true, id, mensaje:'Retiro registrado'};
}
function anularPago(b){const{local,monto,motivo,cargadoPor}=b;if(!local||!monto||!cargadoPor)return{ok:false,error:'Faltan datos'};const s=getSheet(CONFIG.SHEETS.PAGOS);const id=Utilities.getUuid().substring(0,8);const f=Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy HH:mm:ss');s.appendRow([id,local,'',f,-Math.abs(monto),'EFECTIVO',cargadoPor.toUpperCase(),'ANUL: '+(motivo||'')]);auditoria('ANULAR_PAGO',cargadoPor,`L${local}: -$${monto}`);return{ok:true,id};}
function ajustarMora(b){const{local,nuevaMora,motivo,cargadoPor}=b;if(!local||nuevaMora===undefined||!cargadoPor)return{ok:false,error:'Faltan datos'};const s=getSheet(CONFIG.SHEETS.ALQUILERES);const d=s.getDataRange().getValues();const im=d[0].indexOf('MORA');for(let i=1;i<d.length;i++){if(String(d[i][0])===String(local)){const a=d[i][im];s.getRange(i+1,im+1).setValue(nuevaMora);auditoria('AJUSTAR_MORA',cargadoPor,`L${local}: ${a}→${nuevaMora}`);return{ok:true,anterior:a,nueva:nuevaMora};}}return{ok:false,error:'No encontrado'};}

function cambiarInquilino(b){
  const{local,nombreNuevo,alquilerNuevo,nuevaClave,condonarDeuda,cargadoPor}=b;
  if(!local||!nombreNuevo||!cargadoPor)return{ok:false,error:'Faltan datos'};
  const s=getSheet(CONFIG.SHEETS.ALQUILERES);const d=s.getDataRange().getValues();const h=d[0];
  const ix={n:h.indexOf('NOMBRE'),c:h.indexOf('CLAVE'),a:h.indexOf('ALQUILER ACTUAL'),p:h.indexOf('PAGADO'),de:h.indexOf('DEUDA'),m:h.indexOf('MORA'),i:h.indexOf('INTERESES'),dt:h.indexOf('DEUDA TOTAL')};
  for(let i=1;i<d.length;i++){
    if(String(d[i][0])===String(local)){
      const ant={nombre:d[i][ix.n],clave:d[i][ix.c],deuda:d[i][ix.dt]};
      const cF=nuevaClave===true?generarClaveNueva():(nuevaClave||ant.clave);
      const nF=`${local}-${nombreNuevo.toUpperCase()}`;
      s.getRange(i+1,ix.n+1).setValue(nF);
      s.getRange(i+1,ix.c+1).setValue(cF);
      if(alquilerNuevo)s.getRange(i+1,ix.a+1).setValue(alquilerNuevo);
      if(condonarDeuda){[ix.p,ix.de,ix.m,ix.i,ix.dt].forEach(idx=>s.getRange(i+1,idx+1).setValue(0));}
      auditoria('CAMBIAR_INQUILINO',cargadoPor,`L${local}: ${ant.nombre}→${nF}. Deuda: $${ant.deuda}${condonarDeuda?' CONDONADA':''}`);
      return{ok:true,anterior:ant,nuevo:{nombre:nF,clave:cF},condonado:!!condonarDeuda};
    }
  }
  return{ok:false,error:'No encontrado'};
}

function editarLocal(b){const{local,campos,cargadoPor}=b;if(!local||!campos||!cargadoPor)return{ok:false,error:'Faltan datos'};const s=getSheet(CONFIG.SHEETS.ALQUILERES);const d=s.getDataRange().getValues();const h=d[0];for(let i=1;i<d.length;i++){if(String(d[i][0])===String(local)){const c=[];Object.keys(campos).forEach(k=>{const idx=h.indexOf(k);if(idx!==-1){const a=d[i][idx];s.getRange(i+1,idx+1).setValue(campos[k]);c.push(`${k}:${a}→${campos[k]}`);}});auditoria('EDITAR_LOCAL',cargadoPor,`L${local}: ${c.join(',')}`);return{ok:true,cambios:c};}}return{ok:false,error:'No encontrado'};}
function marcarVacante(b){return editarLocal({local:b.local,campos:{NOMBRE:'','ALQUILER ACTUAL':0},cargadoPor:b.cargadoPor});}

function cargarPromo(b){const{local,nombreLocal,promoTexto,cargadoPor}=b;if(!local||!promoTexto||!cargadoPor)return{ok:false,error:'Faltan datos'};try{const ss=SpreadsheetApp.openById(CONFIG.PROMOS_ID);const s=ss.getSheetByName(nombreLocal)||ss.getSheets()[0];s.appendRow([new Date(),promoTexto,'']);auditoria('CARGAR_PROMO',cargadoPor,`L${local}: ${promoTexto.substring(0,60)}`);return{ok:true,mensaje:'Cargada'};}catch(err){return{ok:false,error:err.message};}}
function borrarPromo(b){return{ok:false,error:'Usar planilla directamente'};}

// ═══════════ AUDITORÍA ═══════════
function auditoria(a,u,d){try{let s=SpreadsheetApp.getActive().getSheetByName(CONFIG.SHEETS.AUDITORIA);if(!s){s=SpreadsheetApp.getActive().insertSheet(CONFIG.SHEETS.AUDITORIA);s.appendRow(['FECHA','USUARIO','ACCION','DETALLE']);}const f=Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy HH:mm:ss');s.appendRow([f,(u||'?').toUpperCase(),a,d]);}catch(e){}}

// ═══════════ ANÁLISIS Y GRÁFICOS ═══════════
function analisisGeneral(){
  const alq=listarAlquileres().data;
  const mor=morososTop(100).data;
  const promos=listarPromos();
  const sinP=localesSinPromo();
  
  const tA=alq.reduce((s,a)=>s+(Number(a['ALQUILER ACTUAL'])||0),0);
  const tP=alq.reduce((s,a)=>s+(Number(a.PAGADO)||0),0);
  const dT=mor.reduce((s,m)=>s+(Number(m['DEUDA TOTAL'])||0),0);
  const cumplimiento=tA>0?Math.round((tP/tA)*100):0;
  
  // Distribución de deuda
  const distribucion={
    al_dia:alq.filter(a=>Number(a['DEUDA TOTAL']||0)===0).length,
    chica:mor.filter(m=>m['DEUDA TOTAL']<500000).length,
    media:mor.filter(m=>m['DEUDA TOTAL']>=500000&&m['DEUDA TOTAL']<1500000).length,
    grande:mor.filter(m=>m['DEUDA TOTAL']>=1500000&&m['DEUDA TOTAL']<3000000).length,
    critica:mor.filter(m=>m['DEUDA TOTAL']>=3000000).length
  };
  
  return{
    ok:true,
    cobranza:{esperado:tA,cobrado:tP,deuda:dT,cumplimiento_pct:cumplimiento},
    morosos:{total:mor.length,top3:mor.slice(0,3).map(m=>({nombre:m.NOMBRE,deuda:m['DEUDA TOTAL']}))},
    promos:{con:promos.total||0,sin:sinP.total_sin||0,activacion_pct:promos.total?Math.round((promos.total/(promos.total+sinP.total_sin))*100):0},
    distribucion_deuda:distribucion,
    locales_activos:alq.filter(a=>a.NOMBRE).length
  };
}

function morosidadGrafico(){
  const mor=morososTop(20).data;
  return{
    ok:true,
    data:mor.map(m=>({nombre:m.NOMBRE,deuda:Number(m['DEUDA TOTAL'])||0,mora:Number(m.MORA)||0,intereses:Number(m.INTERESES)||0}))
  };
}

function promosGrafico(){
  const p=listarPromos();
  const s=localesSinPromo();
  return{
    ok:true,
    activas:p.total||0,
    sin_cargar:s.total_sin||0,
    detalle_con:(p.data||[]).map(x=>({local:x.local,fecha:x.fecha})),
    detalle_sin:(s.sin_promo||[]).map(x=>x.nombre)
  };
}

function sugerenciasMix(){
  // Análisis del catálogo de Lito para detectar rubros con muchos vs pocos locales
  try{
    const ss=SpreadsheetApp.openById(CONFIG.VOICEFLOW_ID);
    const sheet=ss.getSheets()[0];
    const data=sheet.getDataRange().getValues();
    
    const rubros={
      'indumentaria_mujer':[],
      'indumentaria_varon':[],
      'indumentaria_infantil':[],
      'calzado':[],
      'tecnologia':[],
      'gastronomia':[],
      'belleza_accesorios':[],
      'hogar':[],
      'otros':[]
    };
    
    let actual='';
    for(let i=0;i<data.length;i++){
      const cell=String(data[i][0]||'').trim();
      if(cell.endsWith(':')){actual=cell.replace(':','').trim();continue;}
      if(!actual||!cell)continue;
      const cL=cell.toLowerCase();
      if(cL.includes('mujer')||cL.includes('dama'))rubros.indumentaria_mujer.push(actual);
      else if(cL.includes('varón')||cL.includes('hombre'))rubros.indumentaria_varon.push(actual);
      else if(cL.includes('niños')||cL.includes('niña')||cL.includes('bebé')||cL.includes('infantil')||cL.includes('kids'))rubros.indumentaria_infantil.push(actual);
      else if(cL.includes('calzado')||cL.includes('zapatill'))rubros.calzado.push(actual);
      else if(cL.includes('tecnología')||cL.includes('celular')||cL.includes('electro'))rubros.tecnologia.push(actual);
      else if(cL.includes('gastronomía')||cL.includes('café')||cL.includes('bar'))rubros.gastronomia.push(actual);
      else if(cL.includes('accesorios')||cL.includes('belleza')||cL.includes('perfum'))rubros.belleza_accesorios.push(actual);
      else if(cL.includes('hogar')||cL.includes('decoración'))rubros.hogar.push(actual);
    }
    
    // Contar locales únicos por rubro
    const conteo={};
    Object.keys(rubros).forEach(k=>{conteo[k]=new Set(rubros[k]).size;});
    
    // Detectar sobre-representados y faltantes
    const total=Object.values(conteo).reduce((s,v)=>s+v,0);
    const sugerencias=[];
    if(conteo.indumentaria_mujer>8)sugerencias.push('⚠️ MUCHOS locales de indumentaria mujer ('+conteo.indumentaria_mujer+'). Saturación.');
    if(conteo.gastronomia<3)sugerencias.push('🎯 FALTAN locales de gastronomía (solo '+conteo.gastronomia+'). Oportunidad.');
    if(conteo.calzado<3)sugerencias.push('🎯 Pocos locales de calzado ('+conteo.calzado+'). Considerar sumar.');
    if(conteo.tecnologia<2)sugerencias.push('🎯 Falta diversidad en tecnología.');
    if(conteo.indumentaria_infantil<5)sugerencias.push('🎯 Pocos locales infantiles ('+conteo.indumentaria_infantil+'). Mercado en crecimiento.');
    
    return{ok:true,conteo,sugerencias,total_analizados:total};
  }catch(err){return{ok:false,error:err.message};}
}

// ═══════════ TRIGGERS AUTOMÁTICOS ═══════════

function cierreDiario(){
  // Ejecutado por trigger a las 22hs
  try{
    const ag=analisisGeneral();
    const caja=estadoCaja();
    const hoy=Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy');
    
    const msg=`📊 *CIERRE DIARIO ${hoy}*
*Feria del Litoral*

💰 *Cobranza del mes:*
• Cobrado: $${formatMoney(ag.cobranza.cobrado)}
• Esperado: $${formatMoney(ag.cobranza.esperado)}
• Cumplimiento: ${ag.cobranza.cumplimiento_pct}%

🚨 *Morosidad:*
• Total morosos: ${ag.morosos.total}
• Deuda total: $${formatMoney(ag.cobranza.deuda)}

Top 3:
${ag.morosos.top3.map((m,i)=>`${i+1}. ${m.nombre}: $${formatMoney(m.deuda)}`).join('\n')}

🎯 *Promos:*
• Con promo activa: ${ag.promos.con}
• Sin cargar: ${ag.promos.sin}
• Activación: ${ag.promos.activacion_pct}%

💵 *Caja:*
${caja.data?Object.keys(caja.data).slice(0,4).map(k=>`• ${k}: $${formatMoney(caja.data[k])}`).join('\n'):'Sin datos'}

—
EL ENCARGADO 🤖`;
    
    // Guardar en hoja CIERRES_DIARIOS
    try{
      const sh=SpreadsheetApp.getActive().getSheetByName(CONFIG.SHEETS.CIERRES_DIARIOS);
      if(sh)sh.appendRow([hoy,ag.cobranza.cobrado,ag.cobranza.esperado,ag.cobranza.deuda,ag.morosos.total,ag.promos.con,'AUTO']);
    }catch(e){}
    
    // Generar link wa.me hacia Roberto
    const link=`https://wa.me/${CONFIG.TELEFONO_ROBERTO}?text=${encodeURIComponent(msg)}`;
    
    return{ok:true,mensaje:msg,link,enviado_a:CONFIG.TELEFONO_ROBERTO};
  }catch(err){return{ok:false,error:err.message};}
}

function avisoVencimientoMasivo(){
  // Ejecutado por trigger día 9 a las 10hs
  // Genera links para TODOS los locales que aún no pagaron
  try{
    const sA=getSheet(CONFIG.SHEETS.ALQUILERES);
    const dA=sA.getDataRange().getValues();const h=dA[0];
    const idxPag=h.indexOf('PAGADO');
    const idxAlq=h.indexOf('ALQUILER ACTUAL');
    const res=[];
    for(let i=1;i<dA.length;i++){
      if(!esLocalValido(dA[i],h))continue;
      const pag=Number(dA[i][idxPag]||0);
      const alq=Number(dA[i][idxAlq]||0);
      if(pag>=alq||alq===0)continue; // ya pagó o sin alquiler
      const num=dA[i][h.indexOf('LOCAL')];
      const lk=generarLinkWA({local:num,plantilla:'vencimiento',operador:'la administración'});
      if(lk.ok)res.push({local:num,link:lk.link,mensaje:lk.mensaje,telefono:lk.telefono});
    }
    return{ok:true,total:res.length,data:res};
  }catch(err){return{ok:false,error:err.message};}
}

// Triggers que se pueden configurar
function trigger_cierre_diario(){cierreDiario();} // Ejecutar a las 22hs
function trigger_vencimiento_dia9(){avisoVencimientoMasivo();} // Ejecutar día 9 a las 10hs
function trigger_morosos_dia11(){linksMorosos({tono:'auto',cantidad:50,operador:'la administración'});} // Día 11 a las 10hs
function trigger_promo_miercoles(){linksSinPromo({operador:'la administración'});} // Miércoles a las 9hs

// ═══════════ CHAT IA ═══════════
function chatClaude(b){
  if(!CONFIG.CLAUDE_API_KEY)return{ok:false,error:'API key no configurada en Apps Script'};
  const{mensajes,sistema}=b;
  if(!mensajes||!Array.isArray(mensajes))return{ok:false,error:'Falta array mensajes'};
  try{
    const r=UrlFetchApp.fetch('https://api.anthropic.com/v1/messages',{
      method:'post',contentType:'application/json',
      headers:{'x-api-key':CONFIG.CLAUDE_API_KEY,'anthropic-version':'2023-06-01'},
      payload:JSON.stringify({model:CONFIG.CLAUDE_MODEL,max_tokens:1500,system:sistema||'',messages:mensajes}),
      muteHttpExceptions:true
    });
    const d=JSON.parse(r.getContentText());
    if(d.content)return{ok:true,respuesta:d.content.filter(c=>c.type==='text').map(c=>c.text).join('\n')};
    return{ok:false,error:d.error?.message||'Error desconocido'};
  }catch(err){return{ok:false,error:err.message};}
}

// ═══════════ CAJA PRO (apertura, cierre, movimientos, histórico) ═══════════

// Estado de caja del día: trae saldo actual (acumulado) + movimientos del día
function estadoCajaDia(){
  try{
    // 1. Saldo actual (último registro de hoja CAJA)
    const sCaja = getSheet(CONFIG.SHEETS.CAJA);
    const dCaja = sCaja.getDataRange().getValues();
    let saldoActual = {efectivo:0, banco:0, total:0, fechaUltima:''};
    if(dCaja.length>=2){
      const h = dCaja[0];
      const u = dCaja[dCaja.length-1];
      const iCaja = h.indexOf('CAJA');
      const iBanco = h.indexOf('BANCO APROX');
      const iTotal = h.indexOf('TOTAL GENERAL');
      const iFecha = h.indexOf('FECHA');
      saldoActual.efectivo = Number(u[iCaja])||0;
      saldoActual.banco = Number(u[iBanco])||0;
      saldoActual.total = Number(u[iTotal])||(saldoActual.efectivo+saldoActual.banco);
      saldoActual.fechaUltima = u[iFecha]||'';
    }
    
    // 2. Movimientos de HOY
    const hoy = Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy');
    const mov = movimientosDia(hoy);
    
    // 3. Verificar si hay apertura de caja activa hoy
    let aperturaHoy = null;
    try{
      const sAp = SpreadsheetApp.getActive().getSheetByName('APERTURAS_CAJA');
      if(sAp){
        const dAp = sAp.getDataRange().getValues();
        for(let i=dAp.length-1;i>=1;i--){
          const f = Utilities.formatDate(new Date(dAp[i][1]),'GMT-3','dd/MM/yyyy');
          if(f===hoy && !dAp[i][6]){ // sin cierre
            aperturaHoy = {
              fecha:f,
              hora:Utilities.formatDate(new Date(dAp[i][1]),'GMT-3','HH:mm'),
              operador:dAp[i][2],
              saldoInicial:Number(dAp[i][3])||0,
              saldoSistema:Number(dAp[i][4])||0,
              diferencia:Number(dAp[i][5])||0,
              observacion:dAp[i][7]||''
            };
            break;
          }
        }
      }
    }catch(e){}
    
    return {
      ok:true,
      saldo_actual: saldoActual,
      movimientos_hoy: mov.ok ? mov : null,
      apertura_hoy: aperturaHoy,
      estado_caja: aperturaHoy ? 'ABIERTA' : 'CERRADA'
    };
  }catch(err){return{ok:false,error:err.message};}
}

// Movimientos del día: pagos cobrados, gastos, retiros
function movimientosDia(fechaStr, fechaHasta){
  try{
    const fechaFiltro = fechaStr || Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy');
    const hayRango = !!fechaHasta;
    
    // Helper: convierte dd/MM/yyyy a Date (medianoche)
    const dmyToDate = (dmy)=>{
      const p = String(dmy).split('/');
      if(p.length!==3) return null;
      return new Date(parseInt(p[2]), parseInt(p[1])-1, parseInt(p[0]));
    };
    const dDesde = hayRango ? dmyToDate(fechaFiltro) : null;
    const dHasta = hayRango ? dmyToDate(fechaHasta) : null;
    if(hayRango && dHasta) dHasta.setHours(23,59,59,999);
    
    // Helper: true si la fecha de la fila entra en el filtro
    const entraEnFiltro = (fechaRow)=>{
      const fechaFmt = fechaRow ? (fechaRow instanceof Date ? Utilities.formatDate(fechaRow,'GMT-3','dd/MM/yyyy') : String(fechaRow).split(' ')[0]) : '';
      if(!hayRango){
        return fechaFmt === fechaFiltro || fechaFmt.includes(fechaFiltro);
      }
      // Modo rango: comparar como Date
      const fRow = fechaRow instanceof Date ? fechaRow : dmyToDate(fechaFmt);
      if(!fRow || !dDesde || !dHasta) return false;
      return fRow >= dDesde && fRow <= dHasta;
    };
    
    // 1. PAGOS
    const sPag = getSheet(CONFIG.SHEETS.PAGOS);
    const dPag = sPag.getDataRange().getValues();
    const hPag = dPag[0];
    const pagos = [];
    let totalPagos = 0;
    for(let i=1;i<dPag.length;i++){
      const fechaRow = dPag[i][hPag.indexOf('FECHA')];
      if(entraEnFiltro(fechaRow)){
        const monto = Number(dPag[i][hPag.indexOf('MONTO')])||0;
        const fechaFmt = fechaRow ? (fechaRow instanceof Date ? Utilities.formatDate(fechaRow,'GMT-3','dd/MM/yyyy') : String(fechaRow).split(' ')[0]) : '';
        const obj = {
          tipo: 'PAGO',
          local: dPag[i][hPag.indexOf('LOCAL')],
          monto: monto,
          metodo: dPag[i][hPag.indexOf('METODO')]||'EFECTIVO',
          operador: dPag[i][hPag.indexOf('CARGADO POR')]||'',
          obs: dPag[i][hPag.indexOf('OBSERVACIONES')]||'',
          hora: fechaRow instanceof Date ? Utilities.formatDate(fechaRow,'GMT-3','HH:mm') : '',
          fecha: fechaFmt
        };
        pagos.push(obj);
        totalPagos += monto;
      }
    }
    
    // 2. GASTOS
    const sGas = getSheet(CONFIG.SHEETS.GASTOS);
    const dGas = sGas.getDataRange().getValues();
    const hGas = dGas[0];
    const gastos = [];
    let totalGastos = 0;
    for(let i=1;i<dGas.length;i++){
      const fechaRow = dGas[i][hGas.indexOf('FECHA')];
      if(entraEnFiltro(fechaRow)){
        const monto = Number(dGas[i][hGas.indexOf('ENTREGAS')])||0;
        if(monto===0)continue;
        const obs = String(dGas[i][hGas.indexOf('OBSERVACION')]||'').trim();
        const cod = String(dGas[i][hGas.indexOf('DETALLE')]||'').trim();
        const fechaFmt = fechaRow ? (fechaRow instanceof Date ? Utilities.formatDate(fechaRow,'GMT-3','dd/MM/yyyy') : String(fechaRow).split(' ')[0]) : '';
        gastos.push({
          tipo: 'GASTO',
          detalle: obs || cod || 'Sin detalle',
          monto: monto,
          metodo: dGas[i][hGas.indexOf('METODO')]||'EFECTIVO',
          codigo: cod,
          fecha: fechaFmt
        });
        totalGastos += monto;
      }
    }
    
    // 3. RETIROS
    const sRet = getSheet(CONFIG.SHEETS.RETIROS);
    const dRet = sRet.getDataRange().getValues();
    const hRet = dRet[0];
    const retiros = [];
    let totalRetiros = 0;
    for(let i=1;i<dRet.length;i++){
      const fechaRow = dRet[i][hRet.indexOf('FECHA')];
      if(entraEnFiltro(fechaRow)){
        const monto = Number(dRet[i][hRet.indexOf('RETIRO')])||0;
        const nombre = dRet[i][hRet.indexOf('NOMBRE')]||'';
        const codigo = String(nombre);
        const operador = codigo==='1131' ? 'ROBERTO' : (codigo==='8505' ? 'SEBASTIAN' : codigo);
        const fechaFmt = fechaRow ? (fechaRow instanceof Date ? Utilities.formatDate(fechaRow,'GMT-3','dd/MM/yyyy') : String(fechaRow).split(' ')[0]) : '';
        retiros.push({tipo:'RETIRO',operador,monto,codigo,fecha:fechaFmt});
        totalRetiros += monto;
      }
    }
    
    // 4. Calcular efectivo vs transferencias
    const efectivoIngresos = pagos.filter(p=>String(p.metodo).toUpperCase().includes('EFECTIVO')).reduce((s,p)=>s+p.monto,0);
    const transfIngresos = pagos.filter(p=>!String(p.metodo).toUpperCase().includes('EFECTIVO')).reduce((s,p)=>s+p.monto,0);
    const efectivoEgresos = gastos.filter(g=>String(g.metodo).toUpperCase().includes('EFECTIVO')).reduce((s,g)=>s+g.monto,0) + totalRetiros;
    
    return {
      ok:true,
      fecha: fechaFiltro,
      fecha_hasta: hayRango ? fechaHasta : null,
      rango: hayRango,
      pagos, gastos, retiros,
      total_ingresos: totalPagos,
      total_egresos: totalGastos + totalRetiros,
      saldo_dia: totalPagos - totalGastos - totalRetiros,
      efectivo_ingresos: efectivoIngresos,
      efectivo_egresos: efectivoEgresos,
      transferencias_ingresos: transfIngresos,
      cantidad_pagos: pagos.length,
      cantidad_gastos: gastos.length,
      cantidad_retiros: retiros.length
    };
  }catch(err){return{ok:false,error:err.message};}
}

// Abrir caja: registra apertura con saldo inicial contado
function abrirCaja(b){
  const{efectivoContado, observacion, cargadoPor} = b;
  if(efectivoContado===undefined||!cargadoPor)return{ok:false,error:'Faltan datos (efectivoContado, cargadoPor)'};
  
  // Saldo del sistema antes de abrir
  const sCaja = getSheet(CONFIG.SHEETS.CAJA);
  const dCaja = sCaja.getDataRange().getValues();
  let saldoSistema = 0;
  if(dCaja.length>=2){
    const h = dCaja[0];
    const u = dCaja[dCaja.length-1];
    saldoSistema = Number(u[h.indexOf('CAJA')])||0;
  }
  
  const diferencia = Number(efectivoContado) - saldoSistema;
  
  // Crear o abrir hoja APERTURAS_CAJA
  let sAp = SpreadsheetApp.getActive().getSheetByName('APERTURAS_CAJA');
  if(!sAp){
    sAp = SpreadsheetApp.getActive().insertSheet('APERTURAS_CAJA');
    sAp.appendRow(['ID','FECHA_HORA','OPERADOR','EFECTIVO_CONTADO','SALDO_SISTEMA','DIFERENCIA_APERTURA','FECHA_CIERRE','OBSERVACION']);
  }
  
  const id = Utilities.getUuid().substring(0,8);
  sAp.appendRow([id, new Date(), cargadoPor.toUpperCase(), Number(efectivoContado), saldoSistema, diferencia, '', observacion||'']);
  auditoria('ABRIR_CAJA', cargadoPor, `Apertura: $${formatMoney(efectivoContado)} (sistema: $${formatMoney(saldoSistema)}, dif: $${formatMoney(diferencia)})`);
  
  return {ok:true, id, efectivo_contado: Number(efectivoContado), saldo_sistema: saldoSistema, diferencia, mensaje:'Caja abierta'};
}

// Cerrar caja: arqueo final del día
function cerrarCaja(b){
  const{efectivoContado, motivo, cargadoPor} = b;
  if(efectivoContado===undefined||!cargadoPor)return{ok:false,error:'Faltan datos'};
  
  // Buscar apertura del día
  let sAp = SpreadsheetApp.getActive().getSheetByName('APERTURAS_CAJA');
  if(!sAp)return{ok:false,error:'No hay apertura registrada'};
  const dAp = sAp.getDataRange().getValues();
  const hoy = Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy');
  let aperturaFila = -1, apertura = null;
  for(let i=dAp.length-1;i>=1;i--){
    const f = dAp[i][1] instanceof Date ? Utilities.formatDate(dAp[i][1],'GMT-3','dd/MM/yyyy') : '';
    if(f===hoy && !dAp[i][6]){
      aperturaFila = i+1;
      apertura = {efectivoApertura:Number(dAp[i][3])||0, operador:dAp[i][2]};
      break;
    }
  }
  if(!apertura)return{ok:false,error:'No hay caja abierta hoy'};
  
  // Movimientos del día
  const mov = movimientosDia(hoy);
  const saldoTeorico = apertura.efectivoApertura + (mov.efectivo_ingresos||0) - (mov.efectivo_egresos||0);
  const diferenciaFinal = Number(efectivoContado) - saldoTeorico;
  
  // Marcar apertura como cerrada
  sAp.getRange(aperturaFila, 7).setValue(new Date());
  if(motivo) sAp.getRange(aperturaFila, 8).setValue(motivo);
  
  // Guardar cierre detallado
  let sCi = SpreadsheetApp.getActive().getSheetByName('CIERRES_CAJA_DETALLE');
  if(!sCi){
    sCi = SpreadsheetApp.getActive().insertSheet('CIERRES_CAJA_DETALLE');
    sCi.appendRow(['FECHA','OPERADOR_APERTURA','OPERADOR_CIERRE','EFECTIVO_APERTURA','INGRESOS_EFECTIVO','EGRESOS_EFECTIVO','SALDO_TEORICO','EFECTIVO_CONTADO','DIFERENCIA','MOTIVO_DIFERENCIA','CANTIDAD_PAGOS','CANTIDAD_GASTOS']);
  }
  sCi.appendRow([
    hoy, apertura.operador, cargadoPor.toUpperCase(),
    apertura.efectivoApertura, mov.efectivo_ingresos||0, mov.efectivo_egresos||0,
    saldoTeorico, Number(efectivoContado), diferenciaFinal, motivo||'',
    mov.cantidad_pagos||0, mov.cantidad_gastos||0
  ]);
  
  // Actualizar saldo de CAJA con el contado real
  ajustarCaja({campo:'CAJA', nuevoSaldo:Number(efectivoContado), motivo:`Cierre de caja del ${hoy} por ${cargadoPor}`, cargadoPor});
  
  auditoria('CERRAR_CAJA', cargadoPor, `Cierre: contado $${formatMoney(efectivoContado)}, teórico $${formatMoney(saldoTeorico)}, dif $${formatMoney(diferenciaFinal)}`);
  
  // Generar mensaje resumen para WhatsApp Roberto
  const resumen = `📊 *CIERRE DE CAJA ${hoy}*
*Feria del Litoral*

Apertura por: ${apertura.operador}
Cierre por: ${cargadoPor.toUpperCase()}

💰 Apertura: $${formatMoney(apertura.efectivoApertura)}
⬆ Ingresos efectivo: $${formatMoney(mov.efectivo_ingresos||0)}
⬇ Egresos efectivo: $${formatMoney(mov.efectivo_egresos||0)}
━━━━━━━━━━━━━━━━━━━━━
📍 Saldo teórico: $${formatMoney(saldoTeorico)}
💵 Efectivo contado: $${formatMoney(efectivoContado)}
${diferenciaFinal===0?'✅ Sin diferencias':diferenciaFinal>0?`🟢 Sobrante: $${formatMoney(diferenciaFinal)}`:`🔴 Faltante: $${formatMoney(Math.abs(diferenciaFinal))}`}
${motivo?`📝 Motivo: ${motivo}`:''}

📋 Movimientos: ${mov.cantidad_pagos||0} pagos, ${mov.cantidad_gastos||0} gastos

— EL ENCARGADO 🤖`;
  
  const linkWA = `https://wa.me/${CONFIG.TELEFONO_ROBERTO}?text=${encodeURIComponent(resumen)}`;
  
  return {
    ok:true,
    apertura,
    movimientos:mov,
    saldo_teorico: saldoTeorico,
    efectivo_contado: Number(efectivoContado),
    diferencia: diferenciaFinal,
    motivo: motivo||'',
    resumen,
    link_whatsapp: linkWA
  };
}

// Histórico de cierres
function historicoCierres(cantidad){
  try{
    const sCi = SpreadsheetApp.getActive().getSheetByName('CIERRES_CAJA_DETALLE');
    if(!sCi)return{ok:true,data:[],total:0};
    const d = sCi.getDataRange().getValues();
    if(d.length<2)return{ok:true,data:[],total:0};
    const h = d[0];
    const cierres = d.slice(1).reverse().slice(0,cantidad||30).map(r=>{
      const o={};
      h.forEach((k,i)=>o[k]=r[i]);
      return o;
    });
    return{ok:true,data:cierres,total:cierres.length};
  }catch(err){return{ok:false,error:err.message};}
}

// ═══════════ CONTRATOS ═══════════
function getSheetContratos(){
  let s = SpreadsheetApp.getActive().getSheetByName('CONTRATOS');
  if(!s){
    s = SpreadsheetApp.getActive().insertSheet('CONTRATOS');
    s.appendRow(['LOCAL','NOMBRE','LINK_DRIVE','FECHA_INICIO','FECHA_VENC','NOTAS','CARGADO_POR','ACTUALIZADO']);
  }
  return s;
}

function diasHasta(fecha){
  if(!fecha)return null;
  const f = fecha instanceof Date ? fecha : new Date(fecha);
  if(isNaN(f.getTime()))return null;
  const hoy = new Date();
  hoy.setHours(0,0,0,0);
  const diff = Math.floor((f - hoy)/(1000*60*60*24));
  return diff;
}

function contratosListar(){
  try{
    const s = getSheetContratos();
    const d = s.getDataRange().getValues();
    const h = d[0];
    const contratos = {};
    for(let i=1;i<d.length;i++){
      const local = String(d[i][0]);
      if(!local)continue;
      const venc = d[i][4];
      contratos[local] = {
        local: local,
        nombre: d[i][1]||'',
        link: d[i][2]||'',
        fecha_inicio: d[i][3] instanceof Date ? Utilities.formatDate(d[i][3],'GMT-3','dd/MM/yyyy') : (d[i][3]||''),
        fecha_venc: venc instanceof Date ? Utilities.formatDate(venc,'GMT-3','dd/MM/yyyy') : (venc||''),
        dias_vence: diasHasta(venc),
        notas: d[i][5]||'',
        cargado_por: d[i][6]||'',
        actualizado: d[i][7] instanceof Date ? Utilities.formatDate(d[i][7],'GMT-3','dd/MM/yyyy') : (d[i][7]||'')
      };
    }
    // Cruzar con alquileres para mostrar TODOS los locales activos
    const sA = getSheet(CONFIG.SHEETS.ALQUILERES);
    const dA = sA.getDataRange().getValues();
    const hA = dA[0];
    const todos = [];
    for(let i=1;i<dA.length;i++){
      if(!esLocalValido(dA[i],hA))continue;
      const num = String(dA[i][hA.indexOf('LOCAL')]);
      const nom = dA[i][hA.indexOf('NOMBRE')];
      const c = contratos[num];
      if(c){
        todos.push(Object.assign({},c,{nombre:nom||c.nombre,estado:obtenerEstadoContrato(c.dias_vence)}));
      } else {
        todos.push({local:num,nombre:nom||'',link:'',fecha_venc:'',dias_vence:null,estado:'SIN_CONTRATO'});
      }
    }
    return{ok:true,data:todos,total:todos.length};
  }catch(err){return{ok:false,error:err.message};}
}

function obtenerEstadoContrato(dias){
  if(dias===null||dias===undefined)return 'SIN_FECHA';
  if(dias<0)return 'VENCIDO';
  if(dias<=30)return 'VENCE_PRONTO';
  if(dias<=90)return 'VENCE_3MESES';
  return 'VIGENTE';
}

function contratoLocal(num){
  if(!num)return{ok:false,error:'Falta num'};
  const r = contratosListar();
  if(!r.ok)return r;
  const c = r.data.find(x=>String(x.local)===String(num));
  return c ? {ok:true,data:c} : {ok:true,data:null};
}

function contratosAlertas(){
  const r = contratosListar();
  if(!r.ok)return r;
  const vencidos = r.data.filter(c=>c.estado==='VENCIDO');
  const vencen_pronto = r.data.filter(c=>c.estado==='VENCE_PRONTO');
  const vencen_3meses = r.data.filter(c=>c.estado==='VENCE_3MESES');
  const sin_contrato = r.data.filter(c=>c.estado==='SIN_CONTRATO');
  const vigentes = r.data.filter(c=>c.estado==='VIGENTE');
  return{
    ok:true,
    vencidos, vencen_pronto, vencen_3meses, sin_contrato, vigentes,
    total_alertas: vencidos.length + vencen_pronto.length + sin_contrato.length
  };
}

function cargarContrato(b){
  const{local,nombre,link,fechaInicio,fechaVenc,notas,cargadoPor} = b;
  if(!local||!cargadoPor)return{ok:false,error:'Faltan datos (local, cargadoPor)'};
  const s = getSheetContratos();
  const d = s.getDataRange().getValues();
  const f = Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy');
  // Buscar si ya existe
  for(let i=1;i<d.length;i++){
    if(String(d[i][0])===String(local)){
      // Actualizar
      if(nombre!==undefined)s.getRange(i+1,2).setValue(nombre);
      if(link!==undefined)s.getRange(i+1,3).setValue(link);
      if(fechaInicio)s.getRange(i+1,4).setValue(new Date(fechaInicio));
      if(fechaVenc)s.getRange(i+1,5).setValue(new Date(fechaVenc));
      if(notas!==undefined)s.getRange(i+1,6).setValue(notas);
      s.getRange(i+1,7).setValue(cargadoPor.toUpperCase());
      s.getRange(i+1,8).setValue(f);
      auditoria('ACTUALIZAR_CONTRATO',cargadoPor,`Local ${local}: vence ${fechaVenc||'?'}`);
      return{ok:true,mensaje:'Contrato actualizado',accion:'update'};
    }
  }
  // Crear nuevo
  s.appendRow([local,nombre||'',link||'',fechaInicio?new Date(fechaInicio):'',fechaVenc?new Date(fechaVenc):'',notas||'',cargadoPor.toUpperCase(),f]);
  auditoria('CARGAR_CONTRATO',cargadoPor,`Local ${local}: vence ${fechaVenc||'?'}`);
  return{ok:true,mensaje:'Contrato cargado',accion:'create'};
}

function borrarContrato(b){
  const{local,cargadoPor} = b;
  if(!local||!cargadoPor)return{ok:false,error:'Faltan datos'};
  const s = getSheetContratos();
  const d = s.getDataRange().getValues();
  for(let i=1;i<d.length;i++){
    if(String(d[i][0])===String(local)){
      s.deleteRow(i+1);
      auditoria('BORRAR_CONTRATO',cargadoPor,`Local ${local}`);
      return{ok:true,mensaje:'Contrato eliminado'};
    }
  }
  return{ok:false,error:'No encontrado'};
}

// Trigger automático para alertas de vencimientos
function trigger_alertas_contratos(){
  const r = contratosAlertas();
  if(!r.ok)return;
  if(r.vencidos.length===0 && r.vencen_pronto.length===0)return;
  
  let msg = `⚠️ *ALERTAS DE CONTRATOS*\n*Feria del Litoral*\n${Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy')}\n\n`;
  
  if(r.vencidos.length){
    msg += `🔴 *VENCIDOS (${r.vencidos.length}):*\n`;
    r.vencidos.forEach(c=>msg+=`• Local ${c.local} - ${c.nombre} (venció hace ${Math.abs(c.dias_vence)} días)\n`);
    msg += '\n';
  }
  if(r.vencen_pronto.length){
    msg += `🟡 *VENCEN EN 30 DÍAS (${r.vencen_pronto.length}):*\n`;
    r.vencen_pronto.forEach(c=>msg+=`• Local ${c.local} - ${c.nombre} (en ${c.dias_vence} días)\n`);
  }
  
  const link = `https://wa.me/${CONFIG.TELEFONO_ROBERTO}?text=${encodeURIComponent(msg)}`;
  return{ok:true,mensaje:msg,link};
}

// ═══════════ CALENDARIO DE EVENTOS Y FERIADOS ═══════════
// Hoja: CALENDARIO
// Columnas: ID | FECHA(yyyy-MM-dd) | TIPO(evento/feriado) | TITULO | ICONO | NOTAS | ORGANIZANDO(bool) | CARGADO_POR | ACTUALIZADO

function getSheetCalendario(){
  let s = SpreadsheetApp.getActive().getSheetByName('CALENDARIO');
  if(!s){
    s = SpreadsheetApp.getActive().insertSheet('CALENDARIO');
    s.appendRow(['ID','FECHA','TIPO','TITULO','ICONO','NOTAS','ORGANIZANDO','CARGADO_POR','ACTUALIZADO']);
    // Precarga inicial: eventos comerciales + feriados 2026 (Argentina)
    const semilla = [
      // EVENTOS COMERCIALES 2026
      ['evt-sanvalentin-26','2026-02-14','evento','San Valentín','💝','',''],
      ['evt-mujer-26','2026-03-08','evento','Día de la Mujer','💐','',''],
      ['evt-padre-26','2026-06-21','evento','Día del Padre','👨','',''],
      ['evt-amigo-26','2026-07-20','evento','Día del Amigo','🤝','',''],
      ['evt-nino-26','2026-08-16','evento','Día del Niño','🧒','',''],
      ['evt-primavera-26','2026-09-21','evento','Día del Estudiante / Primavera','🌸','',''],
      ['evt-madre-26','2026-10-18','evento','Día de la Madre','🌹','',''],
      ['evt-halloween-26','2026-10-31','evento','Halloween','🎃','',''],
      ['evt-blackfriday-26','2026-11-27','evento','Black Friday','🛒','',''],
      ['evt-navidad-26','2026-12-25','evento','Navidad','🎄','',''],
      ['evt-finanio-26','2026-12-31','evento','Fin de Año','🎉','',''],
      // EVENTOS COMERCIALES 2027 (para que sigan apareciendo después)
      ['evt-anionuevo-27','2027-01-01','evento','Año Nuevo','🎊','',''],
      ['evt-reyes-27','2027-01-06','evento','Día de Reyes','👑','',''],
      ['evt-sanvalentin-27','2027-02-14','evento','San Valentín','💝','',''],
      // FERIADOS NACIONALES 2026
      ['fer-anionuevo-26','2026-01-01','feriado','Año Nuevo','🎊','',''],
      ['fer-carnaval1-26','2026-02-16','feriado','Carnaval','🎭','',''],
      ['fer-carnaval2-26','2026-02-17','feriado','Carnaval','🎭','',''],
      ['fer-pte-mar-26','2026-03-23','feriado','Puente turístico','🌉','',''],
      ['fer-memoria-26','2026-03-24','feriado','Día de la Memoria','🕊️','',''],
      ['fer-malvinas-26','2026-04-02','feriado','Veteranos de Malvinas / Jueves Santo','🇦🇷','',''],
      ['fer-viernes-26','2026-04-03','feriado','Viernes Santo','✝️','',''],
      ['fer-trabajador-26','2026-05-01','feriado','Día del Trabajador','👷','',''],
      ['fer-revmayo-26','2026-05-25','feriado','Revolución de Mayo','🇦🇷','',''],
      ['fer-guemes-26','2026-06-15','feriado','Güemes (trasladado)','🐎','',''],
      ['fer-bandera-26','2026-06-20','feriado','Día de la Bandera','🇦🇷','',''],
      ['fer-indep-26','2026-07-09','feriado','Día de la Independencia','🇦🇷','',''],
      ['fer-pte-jul-26','2026-07-10','feriado','Puente turístico','🌉','',''],
      ['fer-sanmartin-26','2026-08-17','feriado','Paso a la Inmortalidad de San Martín','⚔️','',''],
      ['fer-diversidad-26','2026-10-12','feriado','Día del Respeto a la Diversidad Cultural','🌍','',''],
      ['fer-soberania-26','2026-11-23','feriado','Día de la Soberanía Nacional','🇦🇷','',''],
      ['fer-pte-dic-26','2026-12-07','feriado','Puente turístico','🌉','',''],
      ['fer-inmaculada-26','2026-12-08','feriado','Inmaculada Concepción','⛪','',''],
      ['fer-navidad-26','2026-12-25','feriado','Navidad','🎄','','']
    ];
    semilla.forEach(row=>{
      s.appendRow([row[0],row[1],row[2],row[3],row[4],row[5]||'',false,'SISTEMA',new Date()]);
    });
  }
  return s;
}

function calendarioListar(){
  try{
    const s = getSheetCalendario();
    const d = s.getDataRange().getValues();
    if(d.length<2)return{ok:true,data:[],total:0};
    const h = d[0];
    const out = [];
    for(let i=1;i<d.length;i++){
      const fechaRaw = d[i][h.indexOf('FECHA')];
      const fechaStr = fechaRaw instanceof Date ? Utilities.formatDate(fechaRaw,'GMT-3','yyyy-MM-dd') : String(fechaRaw||'');
      out.push({
        id: String(d[i][h.indexOf('ID')]||''),
        fecha: fechaStr,
        tipo: String(d[i][h.indexOf('TIPO')]||'evento'),
        titulo: String(d[i][h.indexOf('TITULO')]||''),
        icono: String(d[i][h.indexOf('ICONO')]||'📅'),
        notas: String(d[i][h.indexOf('NOTAS')]||''),
        organizando: d[i][h.indexOf('ORGANIZANDO')]===true || String(d[i][h.indexOf('ORGANIZANDO')]).toLowerCase()==='true',
        cargado_por: String(d[i][h.indexOf('CARGADO_POR')]||''),
        actualizado: d[i][h.indexOf('ACTUALIZADO')] instanceof Date ? Utilities.formatDate(d[i][h.indexOf('ACTUALIZADO')],'GMT-3','dd/MM/yyyy HH:mm') : ''
      });
    }
    // Ordenar por fecha
    out.sort((a,b)=>String(a.fecha).localeCompare(String(b.fecha)));
    return{ok:true,data:out,total:out.length};
  }catch(err){return{ok:false,error:err.message};}
}

function calendarioProximos(diasMax){
  try{
    const r = calendarioListar();
    if(!r.ok)return r;
    const hoy = new Date(); hoy.setHours(0,0,0,0);
    const lista = [];
    for(const e of r.data){
      const p = e.fecha.split('-');
      if(p.length!==3)continue;
      const fEvento = new Date(parseInt(p[0]),parseInt(p[1])-1,parseInt(p[2]));
      fEvento.setHours(0,0,0,0);
      const diff = Math.floor((fEvento - hoy)/(1000*60*60*24));
      if(diff < 0) continue;       // ya pasó
      if(diff > diasMax) continue; // muy lejano
      lista.push({...e, dias_faltan: diff});
    }
    lista.sort((a,b)=>a.dias_faltan-b.dias_faltan);
    return{ok:true,data:lista,total:lista.length};
  }catch(err){return{ok:false,error:err.message};}
}

function calendarioAgregar(b){
  try{
    const{fecha,tipo,titulo,icono,notas,cargadoPor} = b;
    if(!fecha||!titulo)return{ok:false,error:'Faltan datos (fecha, titulo)'};
    const s = getSheetCalendario();
    const id = 'evt-'+Utilities.getUuid().substring(0,8);
    s.appendRow([id,fecha,tipo||'evento',titulo,icono||'📅',notas||'',false,cargadoPor||'?',new Date()]);
    auditoria('CALENDARIO_AGREGAR',cargadoPor||'?',`${fecha} ${titulo}`);
    return{ok:true,id,mensaje:'Evento agregado'};
  }catch(err){return{ok:false,error:err.message};}
}

function calendarioActualizar(b){
  try{
    const{id,notas,organizando,titulo,fecha,icono,cargadoPor} = b;
    if(!id)return{ok:false,error:'Falta id'};
    const s = getSheetCalendario();
    const d = s.getDataRange().getValues();
    const h = d[0];
    const iId = h.indexOf('ID');
    for(let i=1;i<d.length;i++){
      if(String(d[i][iId])===String(id)){
        const fila = i+1;
        if(notas!==undefined) s.getRange(fila,h.indexOf('NOTAS')+1).setValue(notas);
        if(organizando!==undefined) s.getRange(fila,h.indexOf('ORGANIZANDO')+1).setValue(!!organizando);
        if(titulo!==undefined && titulo) s.getRange(fila,h.indexOf('TITULO')+1).setValue(titulo);
        if(fecha!==undefined && fecha) s.getRange(fila,h.indexOf('FECHA')+1).setValue(fecha);
        if(icono!==undefined && icono) s.getRange(fila,h.indexOf('ICONO')+1).setValue(icono);
        s.getRange(fila,h.indexOf('ACTUALIZADO')+1).setValue(new Date());
        auditoria('CALENDARIO_ACTUALIZAR',cargadoPor||'?',`id ${id}`);
        return{ok:true,mensaje:'Actualizado'};
      }
    }
    return{ok:false,error:'No se encontró el evento'};
  }catch(err){return{ok:false,error:err.message};}
}

function calendarioBorrar(b){
  try{
    const{id,cargadoPor} = b;
    if(!id)return{ok:false,error:'Falta id'};
    const s = getSheetCalendario();
    const d = s.getDataRange().getValues();
    const iId = d[0].indexOf('ID');
    for(let i=1;i<d.length;i++){
      if(String(d[i][iId])===String(id)){
        s.deleteRow(i+1);
        auditoria('CALENDARIO_BORRAR',cargadoPor||'?',`id ${id}`);
        return{ok:true,mensaje:'Eliminado'};
      }
    }
    return{ok:false,error:'No se encontró'};
  }catch(err){return{ok:false,error:err.message};}
}

// ═══════════ REUNIONES CON CHECKLIST ═══════════
// Hoja REUNIONES: ID | FECHA(yyyy-MM-dd) | TITULO | PARTICIPANTES | TEMAS | NOTAS | ESTADO(abierta/cerrada) | CREADO_POR | ACTUALIZADO
// Hoja REUNIONES_OBJETIVOS: ID | REUNION_ID | TEXTO | RESPONSABLE | CUMPLIDO(bool) | FECHA_CREACION | FECHA_CUMPLIDO | CREADO_POR

function getSheetReuniones(){
  let s = SpreadsheetApp.getActive().getSheetByName('REUNIONES');
  if(!s){
    s = SpreadsheetApp.getActive().insertSheet('REUNIONES');
    s.appendRow(['ID','FECHA','TITULO','PARTICIPANTES','TEMAS','NOTAS','ESTADO','CREADO_POR','ACTUALIZADO']);
  }
  return s;
}
function getSheetObjetivos(){
  let s = SpreadsheetApp.getActive().getSheetByName('REUNIONES_OBJETIVOS');
  if(!s){
    s = SpreadsheetApp.getActive().insertSheet('REUNIONES_OBJETIVOS');
    s.appendRow(['ID','REUNION_ID','TEXTO','RESPONSABLE','CUMPLIDO','FECHA_CREACION','FECHA_CUMPLIDO','CREADO_POR']);
  }
  return s;
}

function reunionesListar(){
  try{
    const sR = getSheetReuniones();
    const sO = getSheetObjetivos();
    const dR = sR.getDataRange().getValues();
    const dO = sO.getDataRange().getValues();
    if(dR.length<2) return {ok:true,data:[],total:0,total_pendientes:0};
    const hR = dR[0], hO = dO[0];
    
    // Indexar objetivos por reunión
    const objsPorReu = {};
    for(let i=1;i<dO.length;i++){
      const rid = String(dO[i][hO.indexOf('REUNION_ID')]||'');
      if(!rid)continue;
      if(!objsPorReu[rid]) objsPorReu[rid] = [];
      const fechaCreacion = dO[i][hO.indexOf('FECHA_CREACION')];
      const fechaCumplido = dO[i][hO.indexOf('FECHA_CUMPLIDO')];
      objsPorReu[rid].push({
        id: String(dO[i][hO.indexOf('ID')]||''),
        texto: String(dO[i][hO.indexOf('TEXTO')]||''),
        responsable: String(dO[i][hO.indexOf('RESPONSABLE')]||''),
        cumplido: dO[i][hO.indexOf('CUMPLIDO')]===true || String(dO[i][hO.indexOf('CUMPLIDO')]).toLowerCase()==='true',
        fecha_creacion: fechaCreacion instanceof Date ? Utilities.formatDate(fechaCreacion,'GMT-3','dd/MM/yyyy') : String(fechaCreacion||''),
        fecha_cumplido: fechaCumplido instanceof Date ? Utilities.formatDate(fechaCumplido,'GMT-3','dd/MM/yyyy') : String(fechaCumplido||''),
        creado_por: String(dO[i][hO.indexOf('CREADO_POR')]||'')
      });
    }
    
    const out = [];
    let totalPendientes = 0;
    for(let i=1;i<dR.length;i++){
      const id = String(dR[i][hR.indexOf('ID')]||'');
      if(!id)continue;
      const fechaRaw = dR[i][hR.indexOf('FECHA')];
      const fechaStr = fechaRaw instanceof Date ? Utilities.formatDate(fechaRaw,'GMT-3','yyyy-MM-dd') : String(fechaRaw||'');
      const objs = objsPorReu[id] || [];
      const cumplidos = objs.filter(o=>o.cumplido).length;
      const pendientes = objs.length - cumplidos;
      totalPendientes += pendientes;
      out.push({
        id,
        fecha: fechaStr,
        titulo: String(dR[i][hR.indexOf('TITULO')]||''),
        participantes: String(dR[i][hR.indexOf('PARTICIPANTES')]||''),
        temas: String(dR[i][hR.indexOf('TEMAS')]||''),
        notas: String(dR[i][hR.indexOf('NOTAS')]||''),
        estado: String(dR[i][hR.indexOf('ESTADO')]||'abierta'),
        creado_por: String(dR[i][hR.indexOf('CREADO_POR')]||''),
        actualizado: dR[i][hR.indexOf('ACTUALIZADO')] instanceof Date ? Utilities.formatDate(dR[i][hR.indexOf('ACTUALIZADO')],'GMT-3','dd/MM/yyyy HH:mm') : '',
        objetivos: objs,
        total_obj: objs.length,
        cumplidos: cumplidos,
        pendientes: pendientes,
        porcentaje: objs.length>0 ? Math.round(cumplidos/objs.length*100) : 0
      });
    }
    // Ordenar por fecha descendente (más reciente arriba)
    out.sort((a,b)=>String(b.fecha).localeCompare(String(a.fecha)));
    return{ok:true,data:out,total:out.length,total_pendientes:totalPendientes};
  }catch(err){return{ok:false,error:err.message};}
}

function reunionesPendientes(){
  // Devuelve solo objetivos pendientes agrupados, para mostrar en el Inicio
  try{
    const r = reunionesListar();
    if(!r.ok) return r;
    const pendientes = [];
    r.data.forEach(reu=>{
      reu.objetivos.filter(o=>!o.cumplido).forEach(o=>{
        pendientes.push({
          id: o.id,
          reunion_id: reu.id,
          reunion_titulo: reu.titulo,
          reunion_fecha: reu.fecha,
          texto: o.texto,
          responsable: o.responsable,
          fecha_creacion: o.fecha_creacion
        });
      });
    });
    return{ok:true,data:pendientes,total:pendientes.length,total_reuniones:r.total};
  }catch(err){return{ok:false,error:err.message};}
}

function reunionesCrear(b){
  try{
    const{fecha,titulo,participantes,temas,creadoPor} = b;
    if(!fecha||!titulo)return{ok:false,error:'Faltan datos (fecha, titulo)'};
    const s = getSheetReuniones();
    const id = 'reu-'+Utilities.getUuid().substring(0,8);
    s.appendRow([id, fecha, titulo, participantes||'', temas||'', '', 'abierta', creadoPor||'?', new Date()]);
    auditoria('REUNION_CREAR', creadoPor||'?', `${fecha} ${titulo}`);
    return{ok:true,id,mensaje:'Reunión creada'};
  }catch(err){return{ok:false,error:err.message};}
}

function reunionesActualizar(b){
  try{
    const{id,titulo,fecha,participantes,temas,notas,estado,creadoPor} = b;
    if(!id)return{ok:false,error:'Falta id'};
    const s = getSheetReuniones();
    const d = s.getDataRange().getValues();
    const h = d[0];
    for(let i=1;i<d.length;i++){
      if(String(d[i][h.indexOf('ID')])===String(id)){
        const fila = i+1;
        if(titulo!==undefined && titulo) s.getRange(fila,h.indexOf('TITULO')+1).setValue(titulo);
        if(fecha!==undefined && fecha) s.getRange(fila,h.indexOf('FECHA')+1).setValue(fecha);
        if(participantes!==undefined) s.getRange(fila,h.indexOf('PARTICIPANTES')+1).setValue(participantes);
        if(temas!==undefined) s.getRange(fila,h.indexOf('TEMAS')+1).setValue(temas);
        if(notas!==undefined) s.getRange(fila,h.indexOf('NOTAS')+1).setValue(notas);
        if(estado!==undefined && estado) s.getRange(fila,h.indexOf('ESTADO')+1).setValue(estado);
        s.getRange(fila,h.indexOf('ACTUALIZADO')+1).setValue(new Date());
        auditoria('REUNION_ACTUALIZAR', creadoPor||'?', `id ${id}`);
        return{ok:true,mensaje:'Actualizada'};
      }
    }
    return{ok:false,error:'No se encontró la reunión'};
  }catch(err){return{ok:false,error:err.message};}
}

function reunionesBorrar(b){
  try{
    const{id,creadoPor} = b;
    if(!id)return{ok:false,error:'Falta id'};
    // Borrar objetivos asociados también
    const sO = getSheetObjetivos();
    const dO = sO.getDataRange().getValues();
    const hO = dO[0];
    const iRid = hO.indexOf('REUNION_ID');
    // Borrar de abajo hacia arriba para no romper índices
    for(let i=dO.length-1;i>=1;i--){
      if(String(dO[i][iRid])===String(id)) sO.deleteRow(i+1);
    }
    // Borrar reunión
    const sR = getSheetReuniones();
    const dR = sR.getDataRange().getValues();
    const iId = dR[0].indexOf('ID');
    for(let i=1;i<dR.length;i++){
      if(String(dR[i][iId])===String(id)){
        sR.deleteRow(i+1);
        auditoria('REUNION_BORRAR', creadoPor||'?', `id ${id}`);
        return{ok:true,mensaje:'Eliminada'};
      }
    }
    return{ok:false,error:'No se encontró'};
  }catch(err){return{ok:false,error:err.message};}
}

function objetivoAgregar(b){
  try{
    const{reunionId,texto,responsable,creadoPor} = b;
    if(!reunionId||!texto)return{ok:false,error:'Faltan datos (reunionId, texto)'};
    const s = getSheetObjetivos();
    const id = 'obj-'+Utilities.getUuid().substring(0,8);
    s.appendRow([id, reunionId, texto, responsable||'', false, new Date(), '', creadoPor||'?']);
    auditoria('OBJETIVO_AGREGAR', creadoPor||'?', `R:${reunionId} - ${texto.substring(0,50)}`);
    return{ok:true,id,mensaje:'Objetivo agregado'};
  }catch(err){return{ok:false,error:err.message};}
}

function objetivoToggle(b){
  try{
    const{id,cumplido,creadoPor} = b;
    if(!id)return{ok:false,error:'Falta id'};
    const s = getSheetObjetivos();
    const d = s.getDataRange().getValues();
    const h = d[0];
    const iId = h.indexOf('ID');
    for(let i=1;i<d.length;i++){
      if(String(d[i][iId])===String(id)){
        const fila = i+1;
        const nuevoEstado = cumplido===true || cumplido==='true';
        s.getRange(fila,h.indexOf('CUMPLIDO')+1).setValue(nuevoEstado);
        s.getRange(fila,h.indexOf('FECHA_CUMPLIDO')+1).setValue(nuevoEstado ? new Date() : '');
        auditoria('OBJETIVO_TOGGLE', creadoPor||'?', `${id} → ${nuevoEstado?'cumplido':'pendiente'}`);
        return{ok:true,mensaje: nuevoEstado?'Marcado como cumplido':'Marcado como pendiente'};
      }
    }
    return{ok:false,error:'No se encontró el objetivo'};
  }catch(err){return{ok:false,error:err.message};}
}

function objetivoBorrar(b){
  try{
    const{id,creadoPor} = b;
    if(!id)return{ok:false,error:'Falta id'};
    const s = getSheetObjetivos();
    const d = s.getDataRange().getValues();
    const iId = d[0].indexOf('ID');
    for(let i=1;i<d.length;i++){
      if(String(d[i][iId])===String(id)){
        s.deleteRow(i+1);
        auditoria('OBJETIVO_BORRAR', creadoPor||'?', `id ${id}`);
        return{ok:true,mensaje:'Eliminado'};
      }
    }
    return{ok:false,error:'No se encontró'};
  }catch(err){return{ok:false,error:err.message};}
}

// ═══════════ ANULAR GASTO ═══════════
// Misma lógica que anularPago: NO toca la fila original (para preservar auditoría),
// sino que registra una nueva fila con monto NEGATIVO compensando el gasto erróneo.
function anularGasto(b){
  const{detalle,monto,motivo,metodo,cargadoPor} = b;
  if(!detalle || !monto || !motivo || !cargadoPor) return {ok:false, error:'Faltan datos (detalle, monto, motivo, cargadoPor)'};
  const s = getSheet(CONFIG.SHEETS.GASTOS);
  const h = s.getDataRange().getValues()[0];
  const f = Utilities.formatDate(new Date(),'GMT-3','dd/MM/yyyy');
  
  // Armamos la fila respetando el orden actual de columnas de la hoja GASTOS
  const obsAnul = `ANULADO: ${detalle} (motivo: ${motivo})`;
  // Mapeo de columnas conocidas
  const fila = new Array(h.length).fill('');
  const setCol = (nombre, valor)=>{ const i = h.indexOf(nombre); if(i>=0) fila[i] = valor; };
  setCol('FECHA', f);
  setCol('DETALLE', '');
  setCol('ENTREGAS', -Math.abs(Number(monto)));
  setCol('METODO', (metodo||'EFECTIVO').toUpperCase());
  setCol('OBSERVACION', obsAnul);
  // Si hay alguna columna tipo "CARGADO POR" o similar la rellenamos por las dudas
  if(h.indexOf('CARGADO POR')>=0) setCol('CARGADO POR', String(cargadoPor).toUpperCase());
  
  s.appendRow(fila);
  auditoria('ANULAR_GASTO', cargadoPor, `${detalle} -$${monto} · ${motivo}`);
  return {ok:true, mensaje:'Gasto anulado', fecha:f};
}

// ═══════════ COMPROBANTES (planilla espejo de AppSheet) ═══════════
function comprobantesListar(diasMax){
  try{
    const s = getSheet(CONFIG.SHEETS.COMPROBANTES);
    const d = s.getDataRange().getValues();
    if(d.length<2) return {ok:true, data:[], total:0, mensaje:'Hoja COMPROBANTES vacía'};
    const h = d[0];
    // Detectar columnas comunes (sin saber el nombre exacto, probamos varios)
    const buscarColumna = (...candidatos)=>{
      for(const c of candidatos){
        const i = h.findIndex(x => String(x).toUpperCase().includes(c.toUpperCase()));
        if(i>=0) return i;
      }
      return -1;
    };
    const iFecha = buscarColumna('FECHA','TIMESTAMP','CREATED','DATE');
    const iLocal = buscarColumna('LOCAL','LOCATARIO','LOCAL_ID');
    const iMonto = buscarColumna('MONTO','IMPORTE','TOTAL');
    const iFoto = buscarColumna('FOTO','IMAGEN','COMPROBANTE','ADJUNTO','URL','LINK','ARCHIVO');
    const iNombre = buscarColumna('NOMBRE','LOCATARIO','PERSONA');
    const iObs = buscarColumna('OBSERV','NOTA','COMENTARIO','DESCRIPCION');
    
    const hoy = new Date(); hoy.setHours(0,0,0,0);
    const limite = new Date(hoy); limite.setDate(limite.getDate() - diasMax);
    
    const out = [];
    for(let i=1; i<d.length; i++){
      const r = d[i];
      const fechaRaw = iFecha>=0 ? r[iFecha] : '';
      let fechaStr = '', fechaObj = null;
      if(fechaRaw instanceof Date){
        fechaObj = fechaRaw;
        fechaStr = Utilities.formatDate(fechaRaw,'GMT-3','dd/MM/yyyy HH:mm');
      } else if(fechaRaw) {
        fechaStr = String(fechaRaw);
      }
      // Filtrar por rango si la fecha es Date
      if(fechaObj && fechaObj < limite) continue;
      
      const foto = iFoto>=0 ? String(r[iFoto]||'').trim() : '';
      if(!foto) continue; // sin foto no es un comprobante
      
      out.push({
        fecha: fechaStr,
        local: iLocal>=0 ? String(r[iLocal]||'') : '',
        nombre: iNombre>=0 ? String(r[iNombre]||'') : '',
        monto: iMonto>=0 ? Number(r[iMonto])||0 : 0,
        foto_url: foto,
        observacion: iObs>=0 ? String(r[iObs]||'') : '',
        fila: i+1
      });
    }
    // Más reciente arriba
    out.sort((a,b)=> b.fila - a.fila);
    return {ok:true, data:out, total:out.length, columnas_detectadas:{fecha:iFecha,local:iLocal,monto:iMonto,foto:iFoto}};
  }catch(err){ return {ok:false, error:err.message}; }
}

// ═══════════ SORTEOS (historial) ═══════════
// Hoja SORTEOS: ID | FECHA | TITULO | TOTAL_PARTICIPANTES | GANADORES | SUPLENTES | CARGADO_POR
function getSheetSorteos(){
  let s = SpreadsheetApp.getActive().getSheetByName('SORTEOS');
  if(!s){
    s = SpreadsheetApp.getActive().insertSheet('SORTEOS');
    s.appendRow(['ID','FECHA','TITULO','TOTAL_PARTICIPANTES','GANADORES','SUPLENTES','CARGADO_POR']);
  }
  return s;
}
function sorteosListar(){
  try{
    const s = getSheetSorteos();
    const d = s.getDataRange().getValues();
    if(d.length<2) return {ok:true,data:[],total:0};
    const h = d[0];
    const out = [];
    for(let i=1;i<d.length;i++){
      const fechaRaw = d[i][h.indexOf('FECHA')];
      out.push({
        id: String(d[i][h.indexOf('ID')]||''),
        fecha: fechaRaw instanceof Date ? Utilities.formatDate(fechaRaw,'GMT-3','dd/MM/yyyy HH:mm') : String(fechaRaw||''),
        titulo: String(d[i][h.indexOf('TITULO')]||''),
        total_participantes: Number(d[i][h.indexOf('TOTAL_PARTICIPANTES')])||0,
        ganadores: String(d[i][h.indexOf('GANADORES')]||''),
        suplentes: String(d[i][h.indexOf('SUPLENTES')]||''),
        cargado_por: String(d[i][h.indexOf('CARGADO_POR')]||'')
      });
    }
    out.sort((a,b)=>String(b.fecha).localeCompare(String(a.fecha)));
    return{ok:true,data:out,total:out.length};
  }catch(err){return{ok:false,error:err.message};}
}
function sorteoGuardar(b){
  try{
    const{titulo,total,ganadores,suplentes,cargadoPor} = b;
    if(!titulo || !ganadores) return {ok:false,error:'Faltan datos (titulo, ganadores)'};
    const s = getSheetSorteos();
    const id = 'srt-'+Utilities.getUuid().substring(0,8);
    s.appendRow([id, new Date(), titulo, Number(total)||0, String(ganadores), String(suplentes||''), cargadoPor||'?']);
    auditoria('SORTEO_REALIZADO', cargadoPor||'?', `${titulo} - ${ganadores}`);
    return{ok:true,id,mensaje:'Sorteo guardado en historial'};
  }catch(err){return{ok:false,error:err.message};}
}
function sorteoBorrar(b){
  try{
    const{id,cargadoPor} = b;
    if(!id) return {ok:false,error:'Falta id'};
    const s = getSheetSorteos();
    const d = s.getDataRange().getValues();
    const iId = d[0].indexOf('ID');
    for(let i=1;i<d.length;i++){
      if(String(d[i][iId])===String(id)){
        s.deleteRow(i+1);
        auditoria('SORTEO_BORRAR', cargadoPor||'?', `id ${id}`);
        return{ok:true,mensaje:'Eliminado'};
      }
    }
    return{ok:false,error:'No se encontró'};
  }catch(err){return{ok:false,error:err.message};}
}

// ═══════════ TESTS ═══════════
function test_ping(){console.log('v5.0 OK '+new Date().toISOString());}
function test_promos(){console.log(JSON.stringify(listarPromos(),null,2).substring(0,2000));}
function test_analisis(){console.log(JSON.stringify(analisisGeneral(),null,2));}
function test_cierre(){console.log(JSON.stringify(cierreDiario(),null,2));}
function test_sugerencias(){console.log(JSON.stringify(sugerenciasMix(),null,2));}
function test_personalizado(){const r=generarLinkPersonalizado({local:81,mensajeLibre:'Hola Roberto, mañana 9hs tenemos reunión.',operador:'Roberto'});console.log(JSON.stringify(r,null,2));}
function test_difusion(){const r=generarLinkDifusionPromo({local:58,operador:'Roberto'});console.log(JSON.stringify(r,null,2));}
