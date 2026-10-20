## Configuración del servidor Apache

Para el despliegue se utilizó Apache mediante XAMPP.

La aplicación de producción se encuentra en:

C:\xampp\htdocs\GestorTareasWeb_Produccion

Se configuró un Virtual Host con los siguientes datos:

- Dominio local: gestortareas.local
- Puerto: 80
- Servidor: Apache
- Directorio raíz: GestorTareasWeb_Produccion

También se modificó el archivo hosts de Windows para
asociar el dominio gestortareas.local con 127.0.0.1.

## Empaquetado

Se preparó una versión optimizada que contiene:

- index.html
- css/style.min.css
- js/app.min.js
- img/logo.svg

Los archivos se distribuyen en un paquete ZIP llamado
GestorTareasWeb_v1.0.0.zip.

## Pruebas realizadas

Se verificó que la aplicación pudiera:

- Agregar tareas.
- Marcar tareas como completadas.
- Eliminar tareas.
- Filtrar tareas por estado.
- Conservar información mediante localStorage.

También se comprobó el acceso mediante el Virtual Host
http://gestortareas.local/.
