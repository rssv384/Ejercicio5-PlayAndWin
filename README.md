# Play & - Sistema de Ventas

Este es un proyecto desarrollado en HTML, SASS y JavaScript para la empresa ficticia "Play & Win" como ejercicio para la clase de Desarrollo de Frontend.

El sistema de ventas _Play & Win_ es un sistema web que le permite al cliente publicar su catálogo de videojuegos disponibles y gestionar la venta de estos. Por su parte, los usuarios podrán explorar dicho catálogo y comprar los productos que deseen.

_NOTA: Este es un proyecto en desarrollo, por lo cual la presente documentación está incompleta y es sujeto a cambios._

## Requisitos del Sistema

Antes de comenzar, asegúrate de que tengas instalados los siguientes requisitos en tu sistema:

- **Node.js**: Versión 12 o superior. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **npm**: Versión 6 o superior. npm generalmente se instala junto con Node.js.

## Instalación del Proyecto

Tras instalar _Node.js_ y _npm_ instalados, podrás instalar y configurar el proyecto en tu entorno de desarrollo local:

1. Clona el repositorio:

```bash
git clone https://github.com/rssv384/Ejercicio5-PlayAndWin.git
```

2. Navega al directorio raíz del proyecto:

```bash
cd desarrollo-frontend-ventas
```

3. Instala las dependencias del proyecto utilizando npm (Node Package Manager):

```bash
npm install
```

4. Inicia el servidor de desarrollo:

```bash
npm start
```

_NOTA: Mientras el servidor de desarrollo esté en ejecución, las hojas de estilo SASS se compilarán automáticamente cada vez que se realicen cambios y se guarden._

## Tecnologías Utilizadas

- HTML
- CSS
- SASS
- JavaScript

## Estructura del proyecto

```bash

Ejercicio5-PlayAndWin/    # Carpeta principal del proyecto
│
├── src
│   ├── assets/           # Carpeta para archivos estáticos.
│   │    ├── scss/        # Carpeta para archivos SASS
│   │    ├── css/         # Carpeta para archivos CSS compilados
│   │    └── img/         # Carpeta para imagenes estáticas
│   │
│   │
│   ├── catalogo/      # Sección para el catálogo
│   │    ├── index.html   # Página del catálogo
│   │    ├── script.js    # JavaScript del catálogo
│   │    └── styles.scss  # Estilos SCSS del catálogo
│   │
│   │
│   ├── sales/            # Apartado de ventas
│   │    ├── index.html   # Página de ventas
│   │    ├── script.js    # JavaScript de la página de ventas
│   │    └── styles.scss  # Estilos SCSS de la página de ventas
│   │
│   ├── shared/           # Carpeta con recursos compartidos
│   │    └── utils.js     # JavaScript con funciones y utilidades compartidas
│   │
│   │
│   └─── index.html       # Homepage
│
├── .gitignore            # Excluir carpetas y archivos de Git
│
├── README.md             # Documentación del proyecto
│
├── package.json          # Manifiesto con la información del proyecto

```

## Licencia

**[MIT License](https://opensource.org/license/mit/)**

Copyright (c) 2023 | Alejandro Iribe & Raúl Soto
