# Proyecto de Formateo y Procesamiento de Archivos

## Descripción General

Este proyecto se encarga de procesar archivos de texto obtenidos desde un API externa. Los archivos contienen información en formato de líneas de texto, que es validada, filtrada y estructurada en un formato más manejable. El objetivo principal es transformar el contenido de los archivos en un formato útil y entregarlo como resultado para su consumo en otras aplicaciones o servicios.

## Características Principales

1. **Obtención de Archivos**:
   - Se utiliza un endpoint del API externo para obtener una lista de archivos disponibles.
   - Para cada archivo en la lista, se realiza una solicitud para recuperar su contenido.

2. **Validación y Filtrado de Contenido**:
   - Cada archivo es procesado para validar las líneas según un formato predefinido utilizando expresiones regulares.
   - Solo las líneas válidas son transformadas y almacenadas en el resultado final.

3. **Paralelismo en las Operaciones**:
   - Las solicitudes y el procesamiento de los archivos se realizan de forma concurrente para optimizar el rendimiento.

4. **Manejo de Errores**:
   - Los errores durante la obtención de archivos o el procesamiento de contenido se registran de forma detallada.
   - Los archivos con errores no interrumpen el procesamiento general.

## Arquitectura del Código

### Estructura Principal

- **`getFormats`**:
  Esta función es el punto de entrada para procesar los archivos. Realiza las siguientes tareas:
  1. Obtiene la lista de archivos disponibles mediante `fetchFilesList`.
  2. Para cada archivo, utiliza `fetchFileContentByName` para obtener su contenido.
  3. Filtra y estructura las líneas válidas con `getLinesFromContent`.
  4. Devuelve un array con los archivos formateados y sus respectivas líneas.

- **`getLinesFromContent`**:
  Una función que valida y formatea las líneas de contenido utilizando expresiones regulares.

## Instalacion (tres metodos)

Para correr el proyecto es necesario primero clonar el repositorio

Clona este repositorio:
```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
```

### Instalacion Docker

```bash
sudo docker compose up --build -d
```

## Instalación y Configuración manual

Instala las dependencias:
```bash
npm install
```

Configura las variables de entorno:
- Crea un archivo `.env` en la raíz del proyecto.
- Asegúrate de incluir las siguientes variables:
```env
EXTERNAL_API_URL=https://echo-serv.tbxnet.com/v1
EXTERNAL_API_TOKEN=<TU_TOKEN_AQUÍ>
```

Ejecuta el proyecto:
```bash
npm start
```

## Instalación y Configuración manual

Para realizar las pruebas ejecutar el comando:
```bash
npm test
```


## Posibles Errores

- **Falta de configuración del token**:
  Asegúrate de que la variable de entorno `EXTERNAL_API_TOKEN` esté configurada correctamente.

- **Errores de red**:
  Verifica la conectividad y la disponibilidad del API externo.

## Tecnologías Utilizadas

- Node.js version 14
- Docker version 24