const sheetDataCompleta = SpreadsheetApp.openById(CONFIG("BD_ID_1"));
const sheetRegistro = sheetDataCompleta.getSheetByName(CONFIG("BD_NAME_1"));

const sheetDataFresh = SpreadsheetApp.openById(CONFIG("BD_ID_2"));
const sheetFresh = sheetDataFresh.getSheetByName(CONFIG("BD_NAME_2"));

const sheetDataList = SpreadsheetApp.openById(CONFIG("BD_ID_3"));
const sheetUsuarios = sheetDataList.getSheetByName(CONFIG("BD_NAME_3"));
const sheetProcedencia = sheetDataList.getSheetByName(CONFIG("BD_NAME_4"));
const sheetEnfermedad = sheetDataList.getSheetByName(CONFIG("BD_NAME_5"));
const sheetIDLogosLabs = sheetDataList.getSheetByName(CONFIG("BD_NAME_6"));

const url = CONFIG("URL");

function doGet(e) {
  var u = e.parameter.u || "ValorPorDefecto";
  if (e.parameter.p) {
    var page = e.parameter.p;
  } else {
    var page = "src/index";
  }
  var template = HtmlService.createTemplateFromFile(page);
  template.pubUrl = url;
  template.u = u;

  var html = template.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  html.addMetaTag("viewport", "width=device-width, initial-scale=1");
  return html.setTitle(
    "APP ROM - Aplicativo Web: Gestión de la Información de Recepción y Obtención de Muestras"
  );
}

function obtenerUsuario(usernumberValue) {
  var rangoUsuarios = sheetUsuarios.getDataRange().getDisplayValues();
  let arregloDatosUsuario = [];

  rangoUsuarios.forEach(function (registro) {
    if (registro[4] === usernumberValue) {
      arregloDatosUsuario.push(registro);
    }
  });

  return arregloDatosUsuario;
}

function getdataPersonal() {
  const dataPersonal = sheetUsuarios.getDataRange().getDisplayValues();
  dataPersonal.shift();
  ////console.log(dataEnfermedad);
  return dataPersonal;
}

function getDataProcedencia() {
  const dataProcedencia = sheetProcedencia.getDataRange().getDisplayValues();
  dataProcedencia.shift();
  ////console.log(dataProcedencia);
  return dataProcedencia;
}

function getdataEnfermedad() {
  const dataEnfermedad = sheetEnfermedad.getDataRange().getDisplayValues();
  dataEnfermedad.shift();
  ////console.log(dataEnfermedad);
  return dataEnfermedad;
}

function getdataLaboDes() {
  const dataEnfermedad = sheetEnfermedad.getDataRange().getDisplayValues();
  dataEnfermedad.shift();
  ////console.log(dataEnfermedad);
  return dataEnfermedad;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function verificarPassword(form) {
  var dataUsuarios = sheetUsuarios.getDataRange().getValues();
  for (var i in dataUsuarios) {
    if (
      dataUsuarios[i][1] == form.usuario &&
      dataUsuarios[i][2] == form.contrasena
    ) {
      var usuario = {
        nombre: dataUsuarios[i][0],
        numberuser: dataUsuarios[i][4],
      };
      return usuario;
    }
  }
  throw "La contraseña es incorrecta. Actualiza la página. ";
}

function verificarPassword2(form) {
  var dataUsuarios = sheetUsuarios.getDataRange().getValues();
  for (var i in dataUsuarios) {
    if (
      dataUsuarios[i][1] == form.usuarioM &&
      dataUsuarios[i][2] == form.contrasenaM
    ) {
      var usuario = {
        nombre: dataUsuarios[i][0],
      };
      return usuario;
    }
  }
  throw "La contraseña es incorrecta. Actualiza la página. ";
}

function duplicado(codigo) {
  const result = sheetRegistro
    .createTextFinder(codigo)
    .findAll()
    .map((range) => range.getA1Notation());
  console.log(result);
  if (result.length > 0) {
    let mensaje = "ERROR";
    console.log(mensaje);
    return mensaje;
  } else {
    let mensaje2 = "todo good";
    return mensaje2;
  }
}

function buscarCamposRegistros(nrocodigoID = "2302017562") {
  let registrosArreglo = [];
  const registros = sheetFresh.getDataRange().getDisplayValues();

  registros.forEach((registro) => {
    if (
      registro[0] === nrocodigoID ||
      registro[0] === nrocodigoID + "-SUB01" ||
      registro[0] === nrocodigoID + "-SUB02" ||
      registro[0] === nrocodigoID + "-SUB03" ||
      registro[0] === nrocodigoID + "-SUB04" ||
      registro[0] === nrocodigoID + "-SUB05" ||
      registro[0] === nrocodigoID + "-SUB06" ||
      registro[0] === nrocodigoID + "-SUB07"
    ) {
      registrosArreglo.push(registro);
    }
  });

  console.log(registrosArreglo);
  return registrosArreglo;
}

function buscarCamposRegistrosDig(nrocodigoID = "111111") {
  let registrosArreglo = [];
  const registros = sheetFresh.getDataRange().getDisplayValues();

  registros.forEach((registro) => {
    if (
      registro[0] === nrocodigoID ||
      registro[0] === nrocodigoID + "-SUB01" ||
      registro[0] === nrocodigoID + "-SUB02" ||
      registro[0] === nrocodigoID + "-SUB03" ||
      registro[0] === nrocodigoID + "-SUB04" ||
      registro[0] === nrocodigoID + "-SUB05" ||
      registro[0] === nrocodigoID + "-SUB06" ||
      registro[0] === nrocodigoID + "-SUB07" ||
      registro[0] === nrocodigoID + "-PARTE01" ||
      registro[0] === nrocodigoID + "-PARTE02" ||
      registro[0] === nrocodigoID + "-PARTE03" ||
      registro[0] === nrocodigoID + "-PARTE04" ||
      registro[0] === nrocodigoID + "-PARTE05" ||
      registro[0] === nrocodigoID + "-PARTE06"
    ) {
      registrosArreglo.push(registro);
    }
  });

  console.log(registrosArreglo);
  return registrosArreglo;
}

function buscarCamposRegistrosTools(nrocodigoID = "2302017562") {
  let registrosArreglo = [];
  const registros = sheetRegistro.getDataRange().getDisplayValues();

  registros.forEach((registro) => {
    if (
      registro[0] === nrocodigoID ||
      registro[0] === nrocodigoID + "-SUB01" ||
      registro[0] === nrocodigoID + "-SUB02" ||
      registro[0] === nrocodigoID + "-SUB03" ||
      registro[0] === nrocodigoID + "-SUB04" ||
      registro[0] === nrocodigoID + "-SUB05" ||
      registro[0] === nrocodigoID + "-SUB06" ||
      registro[0] === nrocodigoID + "-SUB07"
    ) {
      registrosArreglo.push(registro);
    }
  });

  console.log(registrosArreglo);
  return registrosArreglo;
}

function buscarCamposRegistrosOficio(oficioBuscado = "111111") {
  let registrosArreglo2 = [];
  const registros = sheetRegistro.getDataRange().getDisplayValues();

  registros.forEach((registro) => {
    if (registro[8] === oficioBuscado) {
      registrosArreglo2.push(registro);
    }
  });

  //console.log(registrosArreglo2);
  return registrosArreglo2;
}

function buscarCamposRegistrosMasivos(dato = "111111") {
  let registrosArreglo3 = [];
  const registros = sheetRegistro.getDataRange().getDisplayValues();
  const fechaInicio = new Date(dato[6]).getTime();
  const fechaFin = new Date(dato[7]).getTime();
  const dimensionFecha = dato[8];

  let fechaRegistro;

  registros.forEach((registro) => {
    if (dimensionFecha === "RECEPCIÓN") {
      fechaRegistro = new Date(registro[13]).getTime();
    } else if (dimensionFecha === "DIGITACIÓN") {
      fechaRegistro = new Date(registro[23]).getTime();
    } else if (dimensionFecha === "ENTREGA") {
      fechaRegistro = new Date(registro[27]).getTime();
    }

    if (fechaRegistro >= fechaInicio && fechaRegistro <= fechaFin) {
      if (dato[0] === "TODO") {
        registrosArreglo3.push(registro);
      } else if (dato[0] === "ENFERMEDAD") {
        if (registro[5] === dato[1]) {
          registrosArreglo3.push(registro);
        }
      } else if (dato[0] === "DIGITADOR") {
        if (registro[22] === dato[2]) {
          registrosArreglo3.push(registro);
        }
      } else if (dato[0] === "LABORATORIO DE DESTINO (Muestras Entregadas)") {
        if (registro[26] === dato[3]) {
          registrosArreglo3.push(registro);
        }
      } else if (dato[0] === "MUESTRAS TOMADAS EN EL INS") {
        if (registro[15] === dato[4]) {
          registrosArreglo3.push(registro);
        }
      } else if (dato[0] === "ESTADO") {
        if (registro[32] === dato[5]) {
          if (
            ![
              "SÍNDROME GUILLIAN BARRÉ",
              "SÍNDROME I. HEMORRÁGICO",
              "SÍNDROME FEBRIL",
              "TORCH",
              "TORCHS",
            ].includes(registro[5])
          ) {
            registrosArreglo3.push(registro);
          }
        } else if (registro[33] === dato[5]) {
          if (
            ![
              "SÍNDROME GUILLIAN BARRÉ",
              "SÍNDROME I. HEMORRÁGICO",
              "SÍNDROME FEBRIL",
              "TORCH",
              "TORCHS",
            ].includes(registro[5])
          ) {
            registrosArreglo3.push(registro);
          }
        }
      }
    }
  });

  return registrosArreglo3;
}

//BACKEND FOR284
function buscarCamposRegistrosFOR284(dato = "111111") {
  let registrosArreglo3 = [];
  const registros = sheetRegistro.getDataRange().getDisplayValues();
  const fechaBuscar = new Date(dato[0] + "T00:00:00"); // se establece la hora a las 00:00:00
  const sindromesPermitidos = [
    "SÍNDROME GUILLIAN BARRÉ",
    "SÍNDROME I. HEMORRÁGICO",
    "SÍNDROME FEBRIL",
    "TORCH",
    "TORCHS",
  ];

  registros.forEach((registro) => {
    const fechaRegistro = new Date(registro[13]);
    if (
      fechaBuscar.getFullYear() === fechaRegistro.getFullYear() &&
      fechaBuscar.getMonth() === fechaRegistro.getMonth() &&
      fechaBuscar.getDate() === fechaRegistro.getDate()
    ) {
      if (
        registro[1] === dato[1] &&
        !registro[0].includes("PARTE") &&
        !sindromesPermitidos.includes(registro[5])
      ) {
        registrosArreglo3.push(registro);
      }
    }
  });

  return registrosArreglo3;
}

function buscarCamposRegistrosFOR027(dato = "111111") {
  let registrosArreglo3 = [];
  const registros = sheetRegistro.getDataRange().getDisplayValues();
  const fechaInicio = new Date(dato[2] + "T00:00:00");
  const fechaFin = new Date(dato[3] + "T23:59:59");
  let ultimaSede;

  registros.forEach((registro) => {
    const fechaRegistro = new Date(registro[27]); // Fecha de ENTREGA
    fechaRegistro.setHours(0, 0, 0, 0);

    if (fechaRegistro >= fechaInicio && fechaRegistro <= fechaFin) {
      if (dato[1] === "TODOS" || registro[26] === dato[1]) {
        if (registro[19] !== "") {
          // Verificar si es una cadena no vacía
          ultimaSede = registro[19];
        } else if (registro[16] !== "") {
          // Verificar si es una cadena no vacía
          ultimaSede = registro[16];
        } else if (registro[1] !== "") {
          // Verificar si es una cadena no vacía
          ultimaSede = registro[1];
        } else {
          ultimaSede = "Datos inconsistentes"; // Asignar un valor predeterminado en caso de cadenas vacías
        }
        if (ultimaSede === dato[0]) {
          //   Logger.log("TERCERA SEDE: " + registro[19]);
          //   Logger.log("SEGUNDA SEDE: " + registro[16]);
          //  Logger.log("PRIMERA SEDE: " + registro[1]);
          //   Logger.log("Ultima sede de recepción: " + ultimaSede);
          registrosArreglo3.push(registro);
        }
      }
    }
  });

  return registrosArreglo3;
}

function actualizarCamposRegistros() {
  let registrosArreglo = [];
  const registros = sheetFresh.getDataRange().getDisplayValues();

  registros.forEach((registro) => {
    {
      registrosArreglo.push(registro);
    }
  });

  //console.log(registrosArreglo);
  return registrosArreglo;
}

function agregarNuevoPass(form) {
  //console.log(form);

  const contrasenaMN = form.contrasenaMN;

  var dataUsuarios = sheetUsuarios.getDataRange().getValues();
  for (var i in dataUsuarios) {
    if (
      dataUsuarios[i][1] == form.usuarioM &&
      dataUsuarios[i][2] == form.contrasenaM
    ) {
      //console.log("ok hasta aqui");
      var INT_R = Number(i) + 1;
      var valoresR = [[contrasenaMN]];
      //console.log(valoresR);
      //console.log(INT_R);
      sheetUsuarios.getRange(INT_R, 3, 1, 1).setValues(valoresR);

      var usuario = {
        nombre: dataUsuarios[i][0],
      };
      //console.log(usuario);
      return usuario;
    }
  }
}

function agregarCRUD(form) {
  //console.log(form);

  const sede2da = form.guardar2raSede;
  const personal2do = form.guardar2doPersonalRecepcion;
  const fecha2da = form.guardar2daFecha;

  const valor = form.mostrarCodigoID;
  var valores = sheetFresh.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  //console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[sede2da, personal2do, fecha2da]];
      sheetFresh.getRange(INT_R, 17, 1, 3).setValues(valoresR);
      agregarCRUDBackup(form);
      return "todo good";
    }
  }
}

function agregarCRUDBackup(form) {
  //console.log(form);

  const sede2da = form.guardar2raSede;
  const personal2do = form.guardar2doPersonalRecepcion;
  const fecha2da = form.guardar2daFecha;

  const valor = form.mostrarCodigoID;
  var valores = sheetRegistro.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  //console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[sede2da, personal2do, fecha2da]];
      sheetRegistro.getRange(INT_R, 17, 1, 3).setValues(valoresR);

      return "todo good";
    }
  }
}

function agregar2CRUD(form2) {
  ////console.log(form2);

  const sede3ra = form2.guardar3raSede;
  const personal3er = form2.guardar3PersonalRecepcion;
  const fecha3er = form2.guardar3Fecha;

  const valor = form2.mMostrarCodigoID;
  var valores = sheetFresh.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  ////console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[sede3ra, personal3er, fecha3er]];
      sheetFresh.getRange(INT_R, 20, 1, 3).setValues(valoresR);
      agregar2CRUDBackup(form2);
      return "todo good";
    }
  }
}

function agregar2CRUDBackup(form2) {
  ////console.log(form2);

  const sede3ra = form2.guardar3raSede;
  const personal3er = form2.guardar3PersonalRecepcion;
  const fecha3er = form2.guardar3Fecha;

  const valor = form2.mMostrarCodigoID;
  var valores = sheetRegistro.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  ////console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[sede3ra, personal3er, fecha3er]];
      sheetRegistro.getRange(INT_R, 20, 1, 3).setValues(valoresR);

      return "todo good";
    }
  }
}

function agregarCRUDEdit(form3) {
  ////console.log(form3);

  const procedencia = form3.procedenciaEDIT;
  const labRef = form3.labRefEDIT;
  const enfermedad = form3.enfermedadEDIT;
  const labDes = form3.labDesEDIT;
  const origenMuestra = form3.origenMuestraEdit;
  const oficio = form3.nroOficioEdit;
  const motivoMuestra = form3.motivoMuestraEdit;
  const empaque = form3.tipoEmpaqueEdit;
  const temperatura = form3.temperaturaEdit;
  const cantidad = form3.cantidadMuestrasEdit;
  const cantidadMX = form3.cantidadMuestrasMXEdit;
  const comentario = form3.comentarioTextareaEdit;
  let tipoMuestra = "";
  const tipoMuestraEdit = form3.tipoMuestraEdit;
  const tipoMuestraEditDig = form3.tipoMuestraEditDig;
  const tipoMuestraEditEnt = form3.tipoMuestraEditEnt;
  tipoMuestra = tipoMuestraEdit || tipoMuestraEditDig || tipoMuestraEditEnt;

  const valor = form3.MostrarCodigoIDEdit;
  var valores = sheetFresh.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  ////console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [
        [
          procedencia,
          labRef,
          enfermedad,
          tipoMuestra,
          origenMuestra,
          oficio,
          motivoMuestra,
          empaque,
          temperatura,
          cantidad,
        ],
      ];
      var valoresR1 = [[comentario]];
      var valoresR2 = [[labDes]];
      var valoresR3 = [[cantidadMX]];
      sheetFresh.getRange(INT_R, 4, 1, 10).setValues(valoresR);
      sheetFresh.getRange(INT_R, 15, 1, 1).setValues(valoresR1);
      sheetFresh.getRange(INT_R, 27, 1, 1).setValues(valoresR2);
      sheetFresh.getRange(INT_R, 35, 1, 1).setValues(valoresR3);

      agregarCRUDEditBackup(form3);
      return "todo good";
    }
  }
}

function agregarCRUDEditBackup(form3) {
  ////console.log(form3);

  const procedencia = form3.procedenciaEDIT;
  const labRef = form3.labRefEDIT;
  const enfermedad = form3.enfermedadEDIT;
  const labDes = form3.labDesEDIT;
  const tipoMuestra = form3.tipoMuestraEdit;
  const origenMuestra = form3.origenMuestraEdit;
  const oficio = form3.nroOficioEdit;
  const motivoMuestra = form3.motivoMuestraEdit;
  const empaque = form3.tipoEmpaqueEdit;
  const temperatura = form3.temperaturaEdit;
  const cantidad = form3.cantidadMuestrasEdit;
  const cantidadMX = form3.cantidadMuestrasMXEdit;
  const comentario = form3.comentarioTextareaEdit;

  const valor = form3.MostrarCodigoIDEdit;
  var valores = sheetRegistro.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  ////console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [
        [
          procedencia,
          labRef,
          enfermedad,
          tipoMuestra,
          origenMuestra,
          oficio,
          motivoMuestra,
          empaque,
          temperatura,
          cantidad,
        ],
      ];
      var valoresR1 = [[comentario]];
      var valoresR2 = [[labDes]];
      var valoresR3 = [[cantidadMX]];
      sheetRegistro.getRange(INT_R, 4, 1, 10).setValues(valoresR);
      sheetRegistro.getRange(INT_R, 15, 1, 1).setValues(valoresR1);
      sheetRegistro.getRange(INT_R, 27, 1, 1).setValues(valoresR2);
      sheetRegistro.getRange(INT_R, 35, 1, 1).setValues(valoresR3);

      return "todo good";
    }
  }
}

function agregarCRUDdig(formDig) {
  //console.log(formDig);

  const personalDig = formDig.guardarPersonalDigitacion;
  const fechaDig = formDig.guardarFechaDig;
  const valor = formDig.mostrarCodigoID;

  var valores = sheetFresh.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  //console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[personalDig, fechaDig]];
      var valoresR2 = [["DIGITADO (PENDIENTE DE ENTREGA)"]];
      sheetFresh.getRange(INT_R, 23, 1, 2).setValues(valoresR);
      sheetFresh.getRange(INT_R, 33, 1, 1).setValues(valoresR2);
      agregarCRUDdigBackup(formDig);
      return "todo good";
    }
  }
}

function agregarCRUDdigBackup(formDig) {
  //console.log(formDig);

  const personalDig = formDig.guardarPersonalDigitacion;
  const fechaDig = formDig.guardarFechaDig;
  const valor = formDig.mostrarCodigoID;

  var valores = sheetRegistro.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  //console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[personalDig, fechaDig]];
      var valoresR2 = [["DIGITADO (PENDIENTE DE ENTREGA)"]];
      sheetRegistro.getRange(INT_R, 23, 1, 2).setValues(valoresR);
      sheetRegistro.getRange(INT_R, 33, 1, 1).setValues(valoresR2);

      return "todo good";
    }
  }
}

function validarCeldasNoVacias(formDig) {
  const valor = formDig.mostrarCodigoID;
  var valores = sheetFresh.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var celda23 = sheetFresh.getRange(INT_R, 23).getValue();
      var celda33 = sheetFresh.getRange(INT_R, 33).getValue();
      if (celda23 == "" || celda33 == "") {
        return "vacio";
      } else {
        return "lleno";
      }
    }
  }
}

function validarCeldasvaciasDivision(formDiv) {
  const valor = formDiv.mostrarCodigoIDDivOf;
  var valores = sheetFresh.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var celda23 = sheetFresh.getRange(INT_R, 23).getValue();
      var celda33 = sheetFresh.getRange(INT_R, 33).getValue();
      if (celda23 == "" || celda33 == "") {
        return "vacio";
      } else {
        return "lleno";
      }
    }
  }
}

function agregarCRUDent(formEnt) {
  //console.log(formEnt);

  const personalEnt = formEnt.guardarLaboratoriosDestino;
  const fechaEnt = formEnt.guardarFechaEnt;
  const valor = formEnt.mostrarCodigoID;

  var valores = sheetFresh.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  //console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[personalEnt, fechaEnt]];
      var valoresR3 = [["LISTO PARA ENTREGA (EN BANDEJA DE SALIDA)"]];
      sheetFresh.getRange(INT_R, 25, 1, 2).setValues(valoresR);
      sheetFresh.getRange(INT_R, 33, 1, 1).setValues(valoresR3);
      agregarCRUDentBackup(formEnt);
      return "todo good";
    }
  }
}

function agregarCRUDentBackup(formEnt) {
  //console.log(formEnt);

  const fechaEnt = formEnt.guardarFechaEnt;
  const valor = formEnt.mostrarCodigoID;

  var valores = sheetRegistro.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  //console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[personalEnt, fechaEnt]];
      var valoresR3 = [["LISTO PARA ENTREGA (EN BANDEJA DE SALIDA)"]];
      sheetRegistro.getRange(INT_R, 25, 1, 2).setValues(valoresR);
      sheetRegistro.getRange(INT_R, 33, 1, 1).setValues(valoresR3);

      return "todo good";
    }
  }
}

function agregarCRUDent2(formEnt2) {
  console.log(formEnt2);

  const textarea = formEnt2.comentarioTextarea;
  const fechaEnt2 = formEnt2.guardarFechaEnt2;
  const valor = formEnt2.mostrarCodigoID2;
  const codigoDesde = formEnt2.codigoDesde;
  const codigoHasta = formEnt2.codigoHasta;
  const firmaLab = formEnt2.firmaLab;

  var valores = sheetFresh.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  //console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[fechaEnt2]];
      var valoresR4 = [["ENTREGADO"]];
      var valoresC = [[textarea]];
      var valoresFor = [[codigoDesde, codigoHasta, firmaLab]];
      sheetFresh.getRange(INT_R, 15, 1, 1).setValues(valoresC);
      sheetFresh.getRange(INT_R, 28, 1, 1).setValues(valoresR);
      sheetFresh.getRange(INT_R, 33, 1, 1).setValues(valoresR4);
      sheetFresh.getRange(INT_R, 36, 1, 3).setValues(valoresFor);
      agregarCRUDent2Backup(formEnt2);
      return "todo good";
    }
  }
}

function agregarCRUDent2Backup(formEnt2) {
  //console.log(formEnt2);

  const textarea = formEnt2.comentarioTextarea;
  const fechaEnt2 = formEnt2.guardarFechaEnt2;
  const valor = formEnt2.mostrarCodigoID2;
  const codigoDesde = formEnt2.codigoDesde;
  const codigoHasta = formEnt2.codigoHasta;
  const firmaLab = formEnt2.firmaLab;

  var valores = sheetRegistro.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  //console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[fechaEnt2]];
      var valoresR4 = [["ENTREGADO"]];
      var valoresC = [[textarea]];
      var valoresFor = [[codigoDesde, codigoHasta, firmaLab]];
      sheetRegistro.getRange(INT_R, 15, 1, 1).setValues(valoresC);
      sheetRegistro.getRange(INT_R, 28, 1, 1).setValues(valoresR);
      sheetRegistro.getRange(INT_R, 33, 1, 1).setValues(valoresR4);
      sheetRegistro.getRange(INT_R, 36, 1, 3).setValues(valoresFor);

      return "todo good";
    }
  }
}

function agregarCRUDRz(formRch) {
  //console.log(formRch);

  const motivoRchz = formRch.guardarMotivoRechazo;
  const cantidadRchz = formRch.guardarCantidadRechazo;
  const valor = formRch.mostrarCodigoID;
  var valores = sheetFresh.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos

  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];

    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[motivoRchz, cantidadRchz]];
      sheetFresh.getRange(INT_R, 29, 1, 2).setValues(valoresR);

      var valoresR5 = [["RECHAZO TOTAL"]];
      var valoresR6 = [["Contiene Rechazos"]];
      const totalRechazos = Number(fila[31]) + Number(cantidadRchz);
      //console.log(totalRechazos);
      //console.log(fila[12]);

      if (totalRechazos == fila[12]) {
        sheetFresh.getRange(INT_R, 34, 1, 1).setValues(valoresR5);
      } else if (Number(totalRechazos) < Number(fila[12])) {
        sheetFresh.getRange(INT_R, 34, 1, 1).setValues(valoresR6);
      }
      agregarCRUDRzBackup(formRch);
      return "todo good";
    }
  }
}

function agregarCRUDRzBackup(formRch) {
  //console.log(formRch);

  const motivoRchz = formRch.guardarMotivoRechazo;
  const cantidadRchz = formRch.guardarCantidadRechazo;
  const valor = formRch.mostrarCodigoID;
  var valores = sheetRegistro.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos

  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];

    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[motivoRchz, cantidadRchz]];
      sheetRegistro.getRange(INT_R, 29, 1, 2).setValues(valoresR);

      var valoresR5 = [["RECHAZO TOTAL"]];
      var valoresR6 = [["Contiene Rechazos"]];
      const totalRechazos = Number(fila[31]) + Number(cantidadRchz);
      //console.log(totalRechazos);
      //console.log(fila[12]);

      if (totalRechazos == fila[12]) {
        sheetRegistro.getRange(INT_R, 34, 1, 1).setValues(valoresR5);
      } else if (Number(totalRechazos) < Number(fila[12])) {
        sheetRegistro.getRange(INT_R, 34, 1, 1).setValues(valoresR6);
      }

      return "todo good";
    }
  }
}

function agregarCRUDRz2(formRch2) {
  //console.log(formRch2);

  const motivoRchz2 = formRch2.guardarMotivoRechazo2;
  const cantidadRchz2 = formRch2.guardarCantidadRechazo2;
  const valor = formRch2.mostrarCodigoID2;

  var valores = sheetFresh.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  //console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[motivoRchz2, cantidadRchz2]];
      sheetFresh.getRange(INT_R, 31, 1, 2).setValues(valoresR);

      var valoresR5 = [["RECHAZO TOTAL"]];
      var valoresR6 = [["Contiene Rechazos"]];
      const totalRechazos = Number(fila[29]) + Number(cantidadRchz2);
      //console.log(totalRechazos);
      //console.log(fila[12]);

      if (totalRechazos == fila[12]) {
        sheetFresh.getRange(INT_R, 34, 1, 1).setValues(valoresR5);
      } else if (Number(totalRechazos) < Number(fila[12])) {
        sheetFresh.getRange(INT_R, 34, 1, 1).setValues(valoresR6);
      }
      agregarCRUDRz2Backup(formRch2);
      return "todo good";
    }
  }
}

function agregarCRUDRz2Backup(formRch2) {
  //console.log(formRch2);

  const motivoRchz2 = formRch2.guardarMotivoRechazo2;
  const cantidadRchz2 = formRch2.guardarCantidadRechazo2;
  const valor = formRch2.mostrarCodigoID2;

  var valores = sheetRegistro.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos
  //console.log(valor);
  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    if (fila[0] == valor) {
      var INT_R = i + 1;
      var valoresR = [[motivoRchz2, cantidadRchz2]];
      sheetRegistro.getRange(INT_R, 31, 1, 2).setValues(valoresR);

      var valoresR5 = [["RECHAZO TOTAL"]];
      var valoresR6 = [["Contiene Rechazos"]];
      const totalRechazos = Number(fila[29]) + Number(cantidadRchz2);
      //console.log(totalRechazos);
      //console.log(fila[12]);

      if (totalRechazos == fila[12]) {
        sheetRegistro.getRange(INT_R, 34, 1, 1).setValues(valoresR5);
      } else if (Number(totalRechazos) < Number(fila[12])) {
        sheetRegistro.getRange(INT_R, 34, 1, 1).setValues(valoresR6);
      }

      return "todo good";
    }
  }
}

function agregarCRUDDivOf(formDiv) {
  const codigoID = formDiv.mostrarCodigoIDDivOf;
  const cantPartes = formDiv.partesOf;
  const parte1 = formDiv.parte1;
  const parte2 = formDiv.parte2;
  const parte3 = formDiv.parte3;
  const parte4 = formDiv.parte4;
  const parte6 = formDiv.parte6;
  const parte5 = formDiv.parte5;
  var valores = sheetFresh.getDataRange().getValues();

  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];

    if (fila[0] == codigoID) {
      var INT_R = i + 1;

      for (var j = 1; j <= cantPartes; j++) {
        var newRow = [];
        const date = new Date(fila[13]);
        const formattedDate =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          date.getDate().toString().padStart(2, "0");
        const formattedTime =
          date.getHours().toString().padStart(2, "0") +
          ":" +
          date.getMinutes().toString().padStart(2, "0");
        newRow.push(
          ...fila.slice(1, 13),
          formattedDate + " " + formattedTime,
          ...fila.slice(14, 34)
        );
        newRow.splice(0, 0, codigoID + "-PARTE0" + j); // Agregar nuevo código de ID en la posición 0
        newRow.splice(12, 1, eval("parte" + j)); // Agregar valor de la parte correspondiente en la posición 12
        sheetFresh.appendRow(newRow); // Agregar la fila a la hoja de cálculo
      }

      var digitadores = [["VARIOS DIGITADORES"]];

      var fechaHoy = [[new Date().toLocaleString()]];

      var estado = [["DIGITADO (PENDIENTE DE ENTREGA)"]];

      sheetFresh.getRange(INT_R, 23, 1, 1).setValues(digitadores);
      sheetFresh.getRange(INT_R, 24, 1, 1).setValues(fechaHoy);
      sheetFresh.getRange(INT_R, 33, 1, 1).setValues(estado);
    }
  }
  agregarCRUDDivOfBACKUP(formDiv);
}

function agregarCRUDDivOfBACKUP(formDiv) {
  const codigoID = formDiv.mostrarCodigoIDDivOf;
  const cantPartes = formDiv.partesOf;
  const parte1 = formDiv.parte1;
  const parte2 = formDiv.parte2;
  const parte3 = formDiv.parte3;
  const parte4 = formDiv.parte4;
  const parte6 = formDiv.parte6;
  const parte5 = formDiv.parte5;
  var valores = sheetRegistro.getDataRange().getValues();

  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];

    if (fila[0] == codigoID) {
      var INT_R = i + 1;

      for (var j = 1; j <= cantPartes; j++) {
        var newRow = [];
        const date = new Date(fila[13]);
        const formattedDate =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          date.getDate().toString().padStart(2, "0");
        const formattedTime =
          date.getHours().toString().padStart(2, "0") +
          ":" +
          date.getMinutes().toString().padStart(2, "0");
        newRow.push(
          ...fila.slice(1, 13),
          formattedDate + " " + formattedTime,
          ...fila.slice(14, 34)
        );
        newRow.splice(0, 0, codigoID + "-PARTE0" + j); // Agregar nuevo código de ID en la posición 0
        newRow.splice(12, 1, eval("parte" + j)); // Agregar valor de la parte correspondiente en la posición 12
        sheetRegistro.appendRow(newRow); // Agregar la fila a la hoja de cálculo
      }

      var digitadores = [["VARIOS DIGITADORES"]];

      var fechaHoy = [[new Date().toLocaleString()]];

      var estado = [["DIGITADO (PENDIENTE DE ENTREGA)"]];

      sheetRegistro.getRange(INT_R, 23, 1, 1).setValues(digitadores);
      sheetRegistro.getRange(INT_R, 24, 1, 1).setValues(fechaHoy);
      sheetRegistro.getRange(INT_R, 33, 1, 1).setValues(estado);
    }
  }
}

function imprimirPlantilla() {
  // Abrir la plantilla en formato de documento de Google
  var documentId = "18nSTJDQW2v1jB-NVxBbKrwZ7df_-ZHmKKA5QaOhDR6U";
  var document = DocumentApp.openById(documentId);

  // Hacer una copia del documento y reemplazar los marcadores de posición con los datos reales
  var file = DriveApp.getFileById(documentId);
  var copy = file.makeCopy();
  var copyId = copy.getId();
  var copyFile = DriveApp.getFileById(copyId);
  var copyDoc = DocumentApp.openById(copyId);

  // Aquí iría el código para reemplazar los marcadores de posición con los datos reales

  // Exportar el archivo en formato PDF
  var blobPDF = copyFile.getAs("application/pdf");

  // Descargar el archivo PDF
  var fileName = "nombre-del-archivo.pdf";
  var fileUrl =
    "data:application/pdf;base64," + Utilities.base64Encode(blobPDF.getBytes());
  var html =
    "<a href='" + fileUrl + "' download='" + fileName + "'>Descargar PDF</a>";
  var ui = HtmlService.createHtmlOutput(html);
  SpreadsheetApp.getUi().showModalDialog(ui, "Descargar PDF");
}

function eliminarFilasAntiguas() {
  var data = sheetFresh.getDataRange().getValues();
  var hoy = new Date();
  var haceUnMes = new Date(hoy.getTime() - 15 * 24 * 60 * 60 * 1000);

  for (var i = data.length - 1; i >= 0; i--) {
    var fechaRegistro = new Date(data[i][13]);
    Logger.log("Fecha de registro en fila " + (i + 1) + ": " + fechaRegistro); // Agregando Logger.log para verificar la fecha de registro
    if (fechaRegistro < haceUnMes) {
      sheetFresh.deleteRow(i + 1);
      Logger.log("Fila " + (i + 1) + " eliminada."); // Agregando Logger.log para verificar si se elimina la fila
    }
  }
  eliminarFilasEnBlanco();
}

function eliminarFilasEnBlanco() {
  var data = sheetFresh.getDataRange().getValues();

  for (var i = data.length - 1; i >= 0; i--) {
    var row = data[i];
    var isEmpty = row.every(function (cell) {
      return cell === "";
    });
    if (isEmpty) {
      sheetFresh.deleteRow(i + 1);
      Logger.log("Fila " + (i + 1) + " eliminada."); // Agregando Logger.log para verificar si se elimina la fila
    }
  }
}

var datosMasivos = {
  fechaEnt: "2023-06-13T11:10",
  codigoID: ["2301003839", "2301003843", "2301003844"],
};

function entregaMasivaFresh(datosMasivos) {
  const fechaEnt = datosMasivos.fechaEnt;
  const codigosID = datosMasivos.codigoID;
  var valores = sheetFresh.getDataRange().getValues();

  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    var valor = fila[0].toString(); // Convertir el valor a cadena para comparar correctamente
    if (codigosID.includes(valor)) {
      var INT_R = i + 1;
      var valoresR = [[fechaEnt]];
      var valoresR4 = [["ENTREGADO"]];
      sheetFresh.getRange(INT_R, 28, 1, 1).setValues(valoresR);
      sheetFresh.getRange(INT_R, 33, 1, 1).setValues(valoresR4);
      agregarCRUDent2Backup(datosMasivos);
    }
  }
  return "success";
}

function entregaMasivaBackup(datosMasivos) {
  const fechaEnt = datosMasivos.fechaEnt;
  const codigosID = datosMasivos.codigoID;
  var valores = sheetRegistro.getDataRange().getValues();

  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    var valor = fila[0].toString(); // Convertir el valor a cadena para comparar correctamente
    if (codigosID.includes(valor)) {
      var INT_R = i + 1;
      var valoresR = [[fechaEnt]];
      var valoresR4 = [["ENTREGADO"]];
      sheetRegistro.getRange(INT_R, 28, 1, 1).setValues(valoresR);
      sheetRegistro.getRange(INT_R, 33, 1, 1).setValues(valoresR4);
    }
  }
  return "success";
}

var datosMasivos2daR = {
  guardar2daFecha: "2023-06-26T14:35",
  guardar2raSede: "ROM JESÚS MARÍA",
  guardar2doPersonalRecepcion: "KAREN NAHID ULLOA MARREROS",
  mostrarCodigoID: ["2303009733", "2303009812", "2303009783"],
};

function agregarCRUDMasivo2daR(datosMasivos2daR) {
  const sede2da = datosMasivos2daR.guardar2raSede;
  const personal2do = datosMasivos2daR.guardar2doPersonalRecepcion;
  const fecha2da = datosMasivos2daR.guardar2daFecha;
  const codId = datosMasivos2daR.mostrarCodigoID;
  var valores = sheetFresh.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos

  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    var valor = fila[0].toString(); // Convertir el valor a cadena para comparar correctamente
    if (codId.includes(valor)) {
      var INT_R = i + 1;

      var valoresR = [[sede2da, personal2do, fecha2da]];
      sheetFresh.getRange(INT_R, 17, 1, 3).setValues(valoresR);
      agregarCRUDMasico2daRBackup(datosMasivos2daR);
      return "todo good";
    }
  }
}

function agregarCRUDMasico2daRBackup(datosMasivos2daR) {
  console.log(datosMasivos2daR);

  const sede2da = datosMasivos2daR.guardar2raSede;
  const personal2do = datosMasivos2daR.guardar2doPersonalRecepcion;
  const fecha2da = datosMasivos2daR.guardar2daFecha;
  const codId = datosMasivos2daR.mostrarCodigoID;
  var valores = sheetRegistro.getDataRange().getValues(); // Nombre de hoja donde se almacenan datos

  for (var i = 0; i < valores.length; i++) {
    var fila = valores[i];
    var valor = fila[0].toString(); // Convertir el valor a cadena para comparar correctamente
    if (codId.includes(valor)) {
      var INT_R = i + 1;

      var valoresR = [[sede2da, personal2do, fecha2da]];
      sheetRegistro.getRange(INT_R, 17, 1, 3).setValues(valoresR);

      return "todo good";
    }
  }
}

function eliminarPeriodo_I() {
  var data = sheetFresh.getDataRange().getValues();
  var fechaLimite = new Date("2023-12-31"); // Fecha límite: 01/07/23

  for (var i = data.length - 1; i >= 0; i--) {
    var fechaRegistro = new Date(data[i][13]);
    // Logger.log('Fecha de registro en fila ' + (i+1) + ': ' + fechaRegistro);

    if (fechaRegistro <= fechaLimite) {
      sheetFresh.deleteRow(i + 1);
      Logger.log("Fecha de registro en fila " + (i + 1) + ": " + fechaRegistro);
      Logger.log("Fila " + (i + 1) + " eliminadas (Fecha periodo I).");
    }
  }
  eliminarFilasEnBlanco_I();
}

function eliminarFilasEnBlanco_I() {
  var data = sheetFresh.getDataRange().getValues();

  for (var i = data.length - 1; i >= 0; i--) {
    var row = data[i];
    var isEmpty = row.every(function (cell) {
      return cell === "";
    });

    if (isEmpty) {
      sheetFresh.deleteRow(i + 1);
      Logger.log("Fila " + (i + 1) + " eliminada (Fila en Blanco).");
    }
  }
}

function grabarNuevaMuestra(form) {
  console.log(form);
  var codigoId = form.codigoId;
  var sede = form.sede;
  var personalRecepcion = form.personalRecepcion;
  var personalRegistro = form.personalRegistro;
  var procedencia = form.procedencia;
  var labRef = form.labRef;
  var enfermedad = form.enfermedad;
  var tipoMuestra = form.tipoMuestra;
  var origenMuestra = form.origenMuestra;
  var nroOficio = form.nroOficio;
  var motivoMuestra = form.motivoMuestra;
  var tipoEmpaque = form.tipoEmpaque;
  var temperatura = form.temperatura;
  var cantidadMuestras = form.cantidadMuestras;
  var cantidadMuestrasMX = form.cantidadMuestrasMX;
  var fechaRecepcion = form.fechaRecepcion;
  var comentarioTextarea = form.comentarioTextarea;
  var flexRadioDefault = form.flexRadioDefault;
  var labDes = form.labDes;
  var cmp = form.cmp;
  var fechaSolicitud = form.fechaSolicitud;
  var subEnfermedad1 = form.subEnfermedad1;
  var subTipomuestras1 = form.subTipomuestras1;
  var subCodigoID1 = form.subCodigoID1;
  var subEnfermedad2 = form.subEnfermedad2;
  var subTipomuestras2 = form.subTipomuestras2;
  var subCodigoID2 = form.subCodigoID2;
  var subEnfermedad3 = form.subEnfermedad3;
  var subTipomuestras3 = form.subTipomuestras3;
  var subCodigoID3 = form.subCodigoID3;
  var subEnfermedad4 = form.subEnfermedad4;
  var subTipomuestras4 = form.subTipomuestras4;
  var subCodigoID4 = form.subCodigoID4;
  var subEnfermedad5 = form.subEnfermedad5;
  var subTipomuestras5 = form.subTipomuestras5;
  var subCodigoID5 = form.subCodigoID5;
  var subEnfermedad6 = form.subEnfermedad6;
  var subTipomuestras6 = form.subTipomuestras6;
  var subCodigoID6 = form.subCodigoID6;
  var subCCantidad1 = form.subCantidadMuestras1;
  var subCCantidad2 = form.subCantidadMuestras2;
  var subCCantidad3 = form.subCantidadMuestras3;
  var subCCantidad4 = form.subCantidadMuestras4;
  var subCCantidad5 = form.subCantidadMuestras5;
  var subCCantidad6 = form.subCantidadMuestras6;
  var labDes1 = form.labDes1;
  var labDes2 = form.labDes2;
  var labDes3 = form.labDes3;
  var labDes4 = form.labDes4;
  var labDes5 = form.labDes5;
  var labDes6 = form.labDes6;

  var numeroUsuarioID = form.numeroUsuarioID;

  const result = sheetFresh
    .createTextFinder(codigoId)
    .findAll()
    .map((range) => range.getA1Notation());
  if (result.length > 0) {
    Looger.log("No se pudo grabar por ERROR de DUPLICIDAD");
    return false; //duplicado
  } else {
    sheetFresh.appendRow([
      codigoId,
      sede,
      personalRecepcion,
      procedencia,
      labRef,
      enfermedad,
      tipoMuestra,
      origenMuestra,
      nroOficio,
      motivoMuestra,
      tipoEmpaque,
      temperatura,
      cantidadMuestras,
      fechaRecepcion,
      comentarioTextarea,
      flexRadioDefault,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      labDes,
      ,
      ,
      ,
      ,
      ,
      "RECEPCIONADO (PENDIENTE DE DIGITAR)",
      ,
      cantidadMuestrasMX,
      ,
      ,
      ,
      personalRegistro,
      ,
      ,
      ,
      ,
      fechaSolicitud,
      cmp,
    ]);

    if (subEnfermedad1 != undefined && subEnfermedad1 != "") {
      sheetFresh.appendRow([
        subCodigoID1,
        sede,
        personalRecepcion,
        procedencia,
        labRef,
        subEnfermedad1,
        subTipomuestras1,
        origenMuestra,
        nroOficio,
        motivoMuestra,
        tipoEmpaque,
        temperatura,
        cantidadMuestras,
        fechaRecepcion,
        comentarioTextarea,
        flexRadioDefault,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        labDes1,
        ,
        ,
        ,
        ,
        ,
        "RECEPCIONADO (PENDIENTE DE DIGITAR)",
        ,
        subCCantidad1,
        ,
        ,
        ,
        personalRegistro,
        ,
        ,
        ,
        ,
        fechaSolicitud,
        cmp,
      ]);
    }
    if (subEnfermedad2 != undefined && subEnfermedad2 != "") {
      sheetFresh.appendRow([
        subCodigoID2,
        sede,
        personalRecepcion,
        procedencia,
        labRef,
        subEnfermedad2,
        subTipomuestras2,
        origenMuestra,
        nroOficio,
        motivoMuestra,
        tipoEmpaque,
        temperatura,
        cantidadMuestras,
        fechaRecepcion,
        comentarioTextarea,
        flexRadioDefault,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        labDes2,
        ,
        ,
        ,
        ,
        ,
        "RECEPCIONADO (PENDIENTE DE DIGITAR)",
        ,
        subCCantidad2,
        ,
        ,
        ,
        personalRegistro,
        ,
        ,
        ,
        ,
        fechaSolicitud,
        cmp,
      ]);
    }
    if (subEnfermedad3 != undefined && subEnfermedad3 != "") {
      sheetFresh.appendRow([
        subCodigoID3,
        sede,
        personalRecepcion,
        procedencia,
        labRef,
        subEnfermedad3,
        subTipomuestras3,
        origenMuestra,
        nroOficio,
        motivoMuestra,
        tipoEmpaque,
        temperatura,
        cantidadMuestras,
        fechaRecepcion,
        comentarioTextarea,
        flexRadioDefault,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        labDes3,
        ,
        ,
        ,
        ,
        ,
        "RECEPCIONADO (PENDIENTE DE DIGITAR)",
        ,
        subCCantidad3,
        ,
        ,
        ,
        personalRegistro,
        ,
        ,
        ,
        ,
        fechaSolicitud,
        cmp,
      ]);
    }
    if (subEnfermedad4 != undefined && subEnfermedad4 != "") {
      sheetFresh.appendRow([
        subCodigoID4,
        sede,
        personalRecepcion,
        procedencia,
        labRef,
        subEnfermedad4,
        subTipomuestras4,
        origenMuestra,
        nroOficio,
        motivoMuestra,
        tipoEmpaque,
        temperatura,
        cantidadMuestras,
        fechaRecepcion,
        comentarioTextarea,
        flexRadioDefault,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        labDes4,
        ,
        ,
        ,
        ,
        ,
        "RECEPCIONADO (PENDIENTE DE DIGITAR)",
        ,
        subCCantidad4,
        ,
        ,
        ,
        personalRegistro,
        ,
        ,
        ,
        ,
        fechaSolicitud,
        cmp,
      ]);
    }
    if (subEnfermedad5 != undefined && subEnfermedad5 != "") {
      sheetFresh.appendRow([
        subCodigoID5,
        sede,
        personalRecepcion,
        procedencia,
        labRef,
        subEnfermedad5,
        subTipomuestras5,
        origenMuestra,
        nroOficio,
        motivoMuestra,
        tipoEmpaque,
        temperatura,
        cantidadMuestras,
        fechaRecepcion,
        comentarioTextarea,
        flexRadioDefault,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        labDes5,
        ,
        ,
        ,
        ,
        ,
        "RECEPCIONADO (PENDIENTE DE DIGITAR)",
        ,
        subCCantidad5,
        ,
        ,
        ,
        personalRegistro,
        ,
        ,
        ,
        ,
        fechaSolicitud,
        cmp,
      ]);
    }
    if (subEnfermedad6 != undefined && subEnfermedad6 != "") {
      sheetFresh.appendRow([
        subCodigoID6,
        sede,
        personalRecepcion,
        procedencia,
        labRef,
        subEnfermedad6,
        subTipomuestras6,
        origenMuestra,
        nroOficio,
        motivoMuestra,
        tipoEmpaque,
        temperatura,
        cantidadMuestras,
        fechaRecepcion,
        comentarioTextarea,
        flexRadioDefault,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        labDes6,
        ,
        ,
        ,
        ,
        ,
        "RECEPCIONADO (PENDIENTE DE DIGITAR)",
        ,
        subCCantidad6,
        ,
        ,
        ,
        personalRegistro,
        ,
        ,
        ,
        ,
        fechaSolicitud,
        cmp,
      ]);
    }

    grabarNuevaMuestraBackup(form);

    return true;
  }
}

function grabarNuevaMuestraBackup(form) {
  console.log(form);
  var codigoId = form.codigoId;
  var sede = form.sede;
  var personalRecepcion = form.personalRecepcion;
  var personalRegistro = form.personalRegistro;
  var procedencia = form.procedencia;
  var labRef = form.labRef;
  var enfermedad = form.enfermedad;
  var tipoMuestra = form.tipoMuestra;
  var origenMuestra = form.origenMuestra;
  var nroOficio = form.nroOficio;
  var motivoMuestra = form.motivoMuestra;
  var tipoEmpaque = form.tipoEmpaque;
  var temperatura = form.temperatura;
  var cantidadMuestras = form.cantidadMuestras;
  var cantidadMuestrasMX = form.cantidadMuestrasMX;
  var fechaRecepcion = form.fechaRecepcion;
  var comentarioTextarea = form.comentarioTextarea;
  var flexRadioDefault = form.flexRadioDefault;
  var labDes = form.labDes;
  var cmp = form.cmp;
  var fechaSolicitud = form.fechaSolicitud;
  var subEnfermedad1 = form.subEnfermedad1;
  var subTipomuestras1 = form.subTipomuestras1;
  var subCodigoID1 = form.subCodigoID1;
  var subEnfermedad2 = form.subEnfermedad2;
  var subTipomuestras2 = form.subTipomuestras2;
  var subCodigoID2 = form.subCodigoID2;
  var subEnfermedad3 = form.subEnfermedad3;
  var subTipomuestras3 = form.subTipomuestras3;
  var subCodigoID3 = form.subCodigoID3;
  var subEnfermedad4 = form.subEnfermedad4;
  var subTipomuestras4 = form.subTipomuestras4;
  var subCodigoID4 = form.subCodigoID4;
  var subEnfermedad5 = form.subEnfermedad5;
  var subTipomuestras5 = form.subTipomuestras5;
  var subCodigoID5 = form.subCodigoID5;
  var subEnfermedad6 = form.subEnfermedad6;
  var subTipomuestras6 = form.subTipomuestras6;
  var subCodigoID6 = form.subCodigoID6;
  var subCCantidad1 = form.subCantidadMuestras1;
  var subCCantidad2 = form.subCantidadMuestras2;
  var subCCantidad3 = form.subCantidadMuestras3;
  var subCCantidad4 = form.subCantidadMuestras4;
  var subCCantidad5 = form.subCantidadMuestras5;
  var subCCantidad6 = form.subCantidadMuestras6;
  var labDes1 = form.labDes1;
  var labDes2 = form.labDes2;
  var labDes3 = form.labDes3;
  var labDes4 = form.labDes4;
  var labDes5 = form.labDes5;
  var labDes6 = form.labDes6;

  const result = sheetRegistro
    .createTextFinder(codigoId)
    .findAll()
    .map((range) => range.getA1Notation());
  if (result.length > 0) {
    Looger.log("No se pudo grabar el backup por ERROR de DUPLICIDAD");
    return false; //duplicado
  } else {
    sheetRegistro.appendRow([
      codigoId,
      sede,
      personalRecepcion,
      procedencia,
      labRef,
      enfermedad,
      tipoMuestra,
      origenMuestra,
      nroOficio,
      motivoMuestra,
      tipoEmpaque,
      temperatura,
      cantidadMuestras,
      fechaRecepcion,
      comentarioTextarea,
      flexRadioDefault,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      labDes,
      ,
      ,
      ,
      ,
      ,
      "RECEPCIONADO (PENDIENTE DE DIGITAR)",
      ,
      cantidadMuestrasMX,
      ,
      ,
      ,
      personalRegistro,
      ,
      ,
      ,
      ,
      fechaSolicitud,
      cmp,
    ]);

    if (subEnfermedad1 != undefined && subEnfermedad1 != "") {
      sheetRegistro.appendRow([
        subCodigoID1,
        sede,
        personalRecepcion,
        procedencia,
        labRef,
        subEnfermedad1,
        subTipomuestras1,
        origenMuestra,
        nroOficio,
        motivoMuestra,
        tipoEmpaque,
        temperatura,
        cantidadMuestras,
        fechaRecepcion,
        comentarioTextarea,
        flexRadioDefault,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        labDes1,
        ,
        ,
        ,
        ,
        ,
        "RECEPCIONADO (PENDIENTE DE DIGITAR)",
        ,
        subCCantidad1,
        ,
        ,
        ,
        personalRegistro,
        ,
        ,
        ,
        ,
        fechaSolicitud,
        cmp,
      ]);
    }
    if (subEnfermedad2 != undefined && subEnfermedad2 != "") {
      sheetRegistro.appendRow([
        subCodigoID2,
        sede,
        personalRecepcion,
        procedencia,
        labRef,
        subEnfermedad2,
        subTipomuestras2,
        origenMuestra,
        nroOficio,
        motivoMuestra,
        tipoEmpaque,
        temperatura,
        cantidadMuestras,
        fechaRecepcion,
        comentarioTextarea,
        flexRadioDefault,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        labDes2,
        ,
        ,
        ,
        ,
        ,
        "RECEPCIONADO (PENDIENTE DE DIGITAR)",
        ,
        subCCantidad2,
        ,
        ,
        ,
        personalRegistro,
        ,
        ,
        ,
        ,
        fechaSolicitud,
        cmp,
      ]);
    }
    if (subEnfermedad3 != undefined && subEnfermedad3 != "") {
      sheetRegistro.appendRow([
        subCodigoID3,
        sede,
        personalRecepcion,
        procedencia,
        labRef,
        subEnfermedad3,
        subTipomuestras3,
        origenMuestra,
        nroOficio,
        motivoMuestra,
        tipoEmpaque,
        temperatura,
        cantidadMuestras,
        fechaRecepcion,
        comentarioTextarea,
        flexRadioDefault,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        labDes3,
        ,
        ,
        ,
        ,
        ,
        "RECEPCIONADO (PENDIENTE DE DIGITAR)",
        ,
        subCCantidad3,
        ,
        ,
        ,
        personalRegistro,
        ,
        ,
        ,
        ,
        fechaSolicitud,
        cmp,
      ]);
    }
    if (subEnfermedad4 != undefined && subEnfermedad4 != "") {
      sheetRegistro.appendRow([
        subCodigoID4,
        sede,
        personalRecepcion,
        procedencia,
        labRef,
        subEnfermedad4,
        subTipomuestras4,
        origenMuestra,
        nroOficio,
        motivoMuestra,
        tipoEmpaque,
        temperatura,
        cantidadMuestras,
        fechaRecepcion,
        comentarioTextarea,
        flexRadioDefault,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        labDes4,
        ,
        ,
        ,
        ,
        ,
        "RECEPCIONADO (PENDIENTE DE DIGITAR)",
        ,
        subCCantidad4,
        ,
        ,
        ,
        personalRegistro,
        ,
        ,
        ,
        ,
        fechaSolicitud,
        cmp,
      ]);
    }
    if (subEnfermedad5 != undefined && subEnfermedad5 != "") {
      sheetRegistro.appendRow([
        subCodigoID5,
        sede,
        personalRecepcion,
        procedencia,
        labRef,
        subEnfermedad5,
        subTipomuestras5,
        origenMuestra,
        nroOficio,
        motivoMuestra,
        tipoEmpaque,
        temperatura,
        cantidadMuestras,
        fechaRecepcion,
        comentarioTextarea,
        flexRadioDefault,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        labDes5,
        ,
        ,
        ,
        ,
        ,
        "RECEPCIONADO (PENDIENTE DE DIGITAR)",
        ,
        subCCantidad5,
        ,
        ,
        ,
        personalRegistro,
        ,
        ,
        ,
        ,
        fechaSolicitud,
        cmp,
      ]);
    }
    if (subEnfermedad6 != undefined && subEnfermedad6 != "") {
      sheetRegistro.appendRow([
        subCodigoID6,
        sede,
        personalRecepcion,
        procedencia,
        labRef,
        subEnfermedad6,
        subTipomuestras6,
        origenMuestra,
        nroOficio,
        motivoMuestra,
        tipoEmpaque,
        temperatura,
        cantidadMuestras,
        fechaRecepcion,
        comentarioTextarea,
        flexRadioDefault,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        labDes6,
        ,
        ,
        ,
        ,
        ,
        "RECEPCIONADO (PENDIENTE DE DIGITAR)",
        ,
        subCCantidad6,
        ,
        ,
        ,
        personalRegistro,
        ,
        ,
        ,
        ,
        fechaSolicitud,
        cmp,
      ]);
    }
  }
}
