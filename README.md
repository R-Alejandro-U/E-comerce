# E-Commerce API en NestJS

## Descripción
Esta es una API básica de comercio electrónico desarrollada en [NestJS](w) como parte de una especialización. Proporciona un sistema robusto para la gestión de usuarios, productos, órdenes y autenticación segura mediante [JWT](w). La aplicación está completamente contenerizada con [Docker](w) y lista para su despliegue.

## Características principales
- **Autenticación y autorización**: Uso de [JWT](w) y [bcrypt](w) para la seguridad, con guardianes que protegen rutas basadas en roles (administrador y usuario).
- **Base de datos**: Implementación con [PostgreSQL](w) usando [TypeORM](w).
- **Seeder inicial**: Precarga de productos, categorías y un usuario administrador inmutable al iniciar la base de datos.
- **Validación y documentación**: Uso de [DTOs](w) personalizados con [class-validator](w) y [class-transformer](w), integrados con [Swagger](w) para documentación automática.
- **Carga de imágenes**: Integración con [Cloudinary](w) para subir imágenes de productos.
- **Contenerización**: Uso de [Docker](w) para empaquetar la aplicación y facilitar el despliegue.
- **Sistema de pedidos**: Creación y gestión de órdenes con validación de stock y asociación al usuario correspondiente.
- **Protección de rutas**: Guardianes en [NestJS](w) que restringen acceso a rutas específicas según el rol del usuario.

## Tecnologías utilizadas
### Backend
- [NestJS](w) (Framework principal)
- [TypeORM](w) (ORM para PostgreSQL)
- [PostgreSQL](w) (Base de datos relacional)
- [JWT](w) (Autenticación)
- [Bcrypt](w) (Encriptación de contraseñas)
- [Swagger](w) (Documentación de API)
- [Cloudinary](w) (Almacenamiento de imágenes)
- [Multer](w) (Carga de archivos)
- [SendGrid](w) (Envío de correos electrónicos)
- [RxJS](w) (Programación reactiva)

### Contenerización y despliegue
- [Docker](w) (Para contenerizar la aplicación)
- [Dotenv](w) (Manejo de variables de entorno)

### Desarrollo y testing
- [TypeScript](w) (Lenguaje principal)
- [Jest](w) (Testing unitario)
- [Supertest](w) (Testing de integración)
- [ESLint](w) y [Prettier](w) (Estilo de código y linting)

## Endpoints principales
### **Auth**
- Registro de usuario
- Inicio de sesión
- Protección de rutas con guardianes

### **Ordenes**
- Crear orden asociada a un usuario y manejar el stock
- Obtener orden por ID

### **Categorías**
- Listar todas las categorías
- Buscar categoría por ID
- Crear una nueva categoría

### **Productos**
- Listar todos los productos
- Buscar producto por ID
- Crear, editar y eliminar productos (solo administradores)

### **Usuarios**
- Obtener información de usuario
- Obtener lista de usuarios (solo administradores)

## Instalación y ejecución
```sh
# Clonar el repositorio
git clone <repositorio>
cd <directorio>

# Instalar dependencias
yarn install  # o npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar la aplicación en desarrollo
yarn start:dev

# O ejecutar con Docker
docker-compose up
```

## Contacto
Para más información o colaboración, puedes contactarme a través de [GitHub](w) o correo electrónico.














<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
