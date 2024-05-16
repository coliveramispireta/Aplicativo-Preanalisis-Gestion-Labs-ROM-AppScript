# Sistema de Gestión de Información para la Etapa Preanalítica de un Laboratorio

Este proyecto consiste en un sistema de gestión de información diseñado para optimizar el flujo de trabajo en la etapa preanalítica de un laboratorio clínico. El sistema abarca desde la recepción de muestras hasta la entrega a la etapa analítica, asegurando un proceso eficiente y preciso.

## Flujo del Proceso

El flujo de trabajo del sistema contempla las siguientes etapas:

1. **Recepción de Muestras:**
   - Recepción inicial de muestras desde diferentes fuentes.
   - Registro de datos básicos de la muestra y su origen.

2. **Recepción Interna entre Sedes:**
   - Gestión de la transferencia de muestras entre sedes internas del laboratorio.
   - Seguimiento y trazabilidad de las muestras en tránsito.

3. **Producción de Personal y Digitación de Datos:**
   - Asignación de tareas de digitación de datos y revisión de información relevante.
   - Proceso de verificación de datos ingresados.

4. **Bandeja de Salida Interna:**
   - Preparación de las muestras para su envío a las áreas correspondientes.
   - Control de calidad y verificación antes de la salida.

5. **Verificación y Entrega al Área Correspondiente:**
   - Verificación final de la información asociada a las muestras.
   - Entrega de las muestras a las áreas analíticas según su clasificación.

6. **Emisión de Reportes:**
   - Generación de informes y reportes basados en los datos recopilados en las etapas anteriores.

Este repositorio contiene medidas de validaciones de credenciales y autenticación de datos del usuario para su usu, las cuares leera las variables obtenidas de los parametros y las comparara con las credenciales del usuario, si no son validadas no permitira acceder, para esto en otro proyecto de "login, muestro como enviar las variables por parametro".

![login](https://github.com/coliveramispireta/assets-images/blob/main/login.PNG)

## Configuración del Proyecto

1. **Configuración de Google Spreadsheet:**

   Configura 3 Google Spreadsheet con los siguientes campos para la base de datos de usuarios:
   - Anota los ID de los Sheets  (debes tener 3 ids, osea tres libros: 2 con 1 hoja y 1 con 4 hojas)
   - Anota los Nombres de la hojas ( 6 hojas)
  
     - 2 libros (cada unno con una hoja con las mismas caberas)
A	ID
B	PRIMERA SEDE
C	PERSONAL QUE RECEPCIONA
D	PROCEDENCIA
E	INSTITUCIÓN / DISA
F	ENFERMEDAD
G	TIPO DE MUESTRA
H	ORIGEN
I	NÚMERO DE OFICIO
J	MOTIVO DE MUESTRA
K	TIPO DE EMPAQUE
L	TEMP.
M	CANT. 
N	FECHA  Y HORA DE RECEPCIÓN
O	COMENTARIOS
P	PARTICULAR / EXONERADO
Q	SEGUNDA SEDE
R	"PERSONAL QUE RECEPCIONA 2DA SEDE"
S	"FECHA Y HORA DE RECEPCIÓN 2DA SEDE"
T	TERCERA SEDE
U	PERSONAL QUE RECEPCIONA 3RA SEDE
V	"FECHA Y HORA DE RECEPCIÓN 3RA SEDE"
W	"PERSONAL DE DIGITACIÓN"
X	FECHA Y HORA DE DIGITACIÓN
Y	"LABORATORIO DESTINO (Bandeja de Salida)"
Z	"FECHA Y HORA Bandeja de Salida"
AA	LABORATORIO DESTINO
AB	"FECHA Y HORA
DE ENTREGA LAB"
AC	MOTIVO DE RECHAZO 1
AD	RECHAZO 1
AE	MOTIVO DE RECHAZO 2
AF	RECHAZO 2
AG	ESTADO
AH	ESTADO DE RECHAZOS
AI	CANT. MX
AJ	COD. INICIO
AK	COD. FIN
AL	FIRMA LAB
AM	"USUARIO QUE REGISTRA
1RA RECEPCION"
AN	"USUARIO QUE REGISTRA 2DA RECEPCION"
AO	"USUARIO QUE REGISTRA 3RA RECEPCION"
AP	"USUARIO QUE REGISTRA ENTREGA"
AQ	"USUARIO QUE REGISTRA RECHAZO"
AR	Fecha de Solicitud
AS	CMP

      - 1 libro (con 4 hojas)
        
**COLUMNA	|  HOJA 1	|  HOJA 2	         |  HOJA 3	               |  HOJA 4**
A	      |nombre	   |PROCEDENCIA         |	ENFERMEDAD	            |LABORATORIO DE DESTINO
B	      |   Usuario	|INSTITUCION / DISA  |	LABORATORIO DE DESTINO	|   ID
C	      |Contraseña	|INSTITUCION	      |  SEDE DE PROCESO	      | QR
D	      |Correo	   |DISA		
E	      |Parametro	|		
F	      |Cargo		|	
G	      |Sede			|
H	      |ROL			|
     

2. **Configuración del Proyecto:**

   Luego de clonar el repo, entra al editor de texto (yo uso VSC) y desde la terminal en la carpeta raiz, ejecuta el siguiente comando para instalar las dependencias necesarias:

   ```bash
   npm install
   ```

3. **Configuración de Variables:**

      -  Crea un archivo en la raíz llamado "Config.js" con el siguiente contenido:

 ```bash

function CONFIG(v) {
    const CONFIG_VALUES = {
        URL:"<vacio>",
        BD_ID_1:"AQUI EL ID DE TU SPREADSHEET",
        BD_ID_2:"AQUI EL ID DE TU SPREADSHEET",
        BD_ID_3:"AQUI EL ID DE TU SPREADSHEET",
        BD_NAME_1:"AQUI EL NOMBRE DE TU HOJA DEL SPREADSHEET",        
        BD_NAME_2:"AQUI EL NOMBRE DE TU HOJA DEL SPREADSHEET",        
        BD_NAME_3:"AQUI EL NOMBRE DE TU HOJA DEL SPREADSHEET",
        BD_NAME_4:"AQUI EL NOMBRE DE TU HOJA DEL SPREADSHEET",
        BD_NAME_5:"AQUI EL NOMBRE DE TU HOJA DEL SPREADSHEET",
        BD_NAME_6:"AQUI EL NOMBRE DE TU HOJA DEL SPREADSHEET",
        APP_MANAGER:AQUI LA URL que manejara sus vistas o con la que abriras tu login"
      };

      if (CONFIG_VALUES.hasOwnProperty(v)) {
        return CONFIG_VALUES[v];
      } else {
        throw new Error("Configuración no encontrada");
      }
    }
 ```


    -  Además, crea otro archivo llamado Config.html dentro de src/helpers con el siguiente contenido:


```bash
<script>
    const URL_APP_MANAGER = "AQUI_ VA_LA_URL_DEL_ HOME_A_DONDE_QUIERES_QUE_TE_REDIRIJA_EN_CASO_SE_VALIDEN_CORRECTAMENTE_LAS_CREDENCIALES_DEL_USUARIO"; 

    const asignarHrefALinks = (() => {
      const enlaces = {
        link_1: "URL_DASHBOARD_PUEDES_TRABAJAR-CON_LOOKERSTUDIO",
        link_2: "URL_DASHBOARD_PUEDES_TRABAJAR-CON_LOOKERSTUDIO",
        link_3: "URL_DASHBOARD_PUEDES_TRABAJAR-CON_LOOKERSTUDIO",
        link_4: "URL_DASHBOARD_PUEDES_TRABAJAR-CON_LOOKERSTUDIO",
        link_5: "URL_DASHBOARD_PUEDES_TRABAJAR-CON_LOOKERSTUDIO",
        link_6: "URL_DASHBOARD_PUEDES_TRABAJAR-CON_LOOKERSTUDIO",
        link_7: "URL_del_LOGIN_para_cerrar_sesion"
      };
    
      for (const id in enlaces) {
        const enlace = document.getElementById(id);
        if (enlace) {
          enlace.href = enlaces[id];
        }
      }
    })();

</script>
```
**IMPORTANTE:** en el archivo src/helpers/Controller encontraras un array "arregloUser" con los parametros que deberas usar para cada usuario que quieras agregar a la base de datos y usuario, solo asi validara al usuario y lo dejara usar el app (cada vez q agreges un usuario a la bd users del login, asignale uno de los parametros de este array, son parametros unicos, no deben repetirse y solo usar uno por usuario)

4. **Instalación del Clasp:**

Instala CLASP globalmente con el siguiente comando:

```bash
npm install -g @google/clasp
```

Habilita la API de Google Apps Script en tu cuenta de Google desde Configuración de Usuario en Google Apps Script:  https://script.google.com/home/usersettings

5. **Inicia sesión en CLASP con el comando**

```bash
npx clasp login
```

6. **Crea un nuevo proyecto de Google Apps Script con el comando**

```bash
npx clasp create
```

**Nota: no olvides pushear cada vez que hagas un cambio**
```bash
npx clasp push
```

Luego, busca el archivo en Google Apps Script desde tu cuenta de Google logueada.


## Ejecución

Recuerda implemetar el proyecto Como "Aplicativo Web" desde Google App Script". Una vez configurado el proyecto y creado en Google Apps Script, podrás ejecutar el aplicativo desde el URL proporcionado por GAS y gestionar las vistas desde tu aplicación manager. 
El Jasvascript del proyecto se encargará de validar los datos del usuario registrado en la base de spreadsheet y de ser validados te redirigirá a la url de tu eleccion (tu app Home). Además contiene funciones de cambio de contraseña previa validación de las credenciales. 

Espero te sirva y te guste!!

Hecho con ❤️ por [Carlos Olivera](https://github.com/coliveramispireta)

![Page](https://github.com/coliveramispireta/assets-images/blob/main/page.PNG)
