# PROGRAMACIÓN BACKEND

# Comisión #32095

# Desafío 22

---

## User story / briel:

---

- Contendrá las rutas necesarias que permitan listar los productos existentes, ingresar productos nuevos, borrar y modificar sus detalles, así como interactuar con el carrito de compras

- Se implementará una API RESTful con los verbos get, post, put y delete para cumplir con todas las acciones necesarias

- Se debe brindar al FrontEnd un mecanismo de ingreso autorizado al sistema basado en JWT

- Los productos ingresados se almacenarán en una base de datos MongoDB.

- El usuario podrá registrar sus credenciales de acceso (email y password) para luego poder ingresar a su cuenta. Estas credencialesserán guardadas en la base de datos MongoDB encriptando la contraseña.

- El cliente tendrá una sesión activa de usuario con tiempo de expiración configurable

- Implementarás un canal de chat basado en websockets, el cual permita atender las consultas del cliente

- La arquitectura del servidor estará basada en capas (MVC)

- El servidor podrá tomar configuracioens desde un archivo externo

- Dispondrá de una vista creada con pug, que permite ver la configuración del servidor

- Se enviará un mail a una casilla configurable, por cada registro nuevo de usuario y con cada orden de compra generada

- En caso de detectar algún error, el servidor enviará una vista implementada con ejs, que contenga el id y el detalle completo

- Dos opciones para el frontend: desarrollo por parte del estudiante, ó se proporcionará uno para hacer las pruebas necesarias

---

## Requisitos base:

---

- Inicio: Al momento de requerir la ruta base "/"

  - Permitir un menú de ingreso al sistema con email y password así como también la posibilidad de registro de un nuevo usuario.

  - El menú de registro consta del nombre completo del cliente, número telefónico, email y campo de password duplicado para verificar coincidencia.

  - Si un usuario se loguea exitosamente o está en sesión activa, la ruta "**/**" hará una re dirección a la ruta del carrito "**/productos**".

  - La ruta "**/productos**" devolverá el listado de todos los productos disponibles para la compra.

  - La ruta "**/productos/:categoria**" devolverá los productos por la categoría requerida

  - Los ítems podrán ser agregados al carrito de compras y listados a través de la ruta "**/carrito**"

  - Se podrán modificar y borrar por su id a través de la ruta "**/carrito:id**"

- Flow: Se puede solicitar un producto específico con la ruta "**/productos/:id**", donde **id** es el id del item generado por MongoDB y devolver la <span style="text-decoration:underline">descripción del producto</span> (foto, precio, selector de cantidad)

- Si se ingresa a "**/productos/:id**" y el <span style="text-decoration:underline">producto no existe</span> en MongoDB, debemos responder un mensaje adecuado que indique algo relacionado a que el producto no existe

- MongoDB:
  - Implementar al menos estas colecciones
    - **usuarios:** clientes registrados
    - **productos:** catálogo completo
      - Link para foto (puede almacenarse de modo estático en la página de una sub ruta "**/images/:productoid**")
      - Precio unitario
      - Descripción
      - Categoría
    - **mensajes:** chat del usuario (preguntas y respuestas)
      - Email: del usuario que pregunta o al que se responde
      - Tipo ("usuario" para preguntas ó "sistema" para respuestas)
      - Fecha y hora
      - Cuerpo del mensaje
    - **carrito:** orden temporal de compra
      - Email
      - Fecha y hora
      - Items con sus cantidades
      - Dirección de entrega
    - **ordenes:** las órdenes generadas, que deben incluir los producto, descripciones y los precios **al momento de la compra.**
      - Ítems: las órdenes deben poder tener <span style="text-decoration:underline">productos surtidos</span>, cada uno con su cantidad. Por ejemplo: remeras x2 y gorra x1
      - Número de orden: Se extrae de la cantidad de órdenes almacenadas
      - Fecha y hora
      - Estado (por defecto en "generada")
      - Email de quién realizó la orden
- Finalizada la orden, enviar un mail a la dirección de mi cuenta con los detalles de la orden
- Se dispondrá de un archivo de configuración externo con opciones para desarrollo y otras para producción, que serán visualizadas a través de una vista construida con handlebars. Como parámetros de configuración estará el puerto de escucha del servidor, la url de la base de datos, el mail que recibirá las notificaciones del backend, tiempo de expiración de sesión y los que sea necesario incluir
- Vamos a contar con un canal de chat general donde el usuario enviará sus mensajes en la ruta "**/chat**" y en "**/chat/:email**" podrá ver solo los suyos. Se utilizará la colección **mensajes** en MongoDB. La tecnología de comunicación a utilizar será Websockets. El servidor implementará una vista, utilizando handlebars, para visualizar los mensajes y poder responder individualmente a ellos, eligiendo el email de respuesta

---

## Requisitos extra:

---

Los requisitos extra son funcionalidades opcionales que no se incluyen en los criterios de evaluación, pero si te falta diversión y quieres agregar valor a tu proyecto... ¡bajo la única **condición** de que **lo que incluyas debe funcionar!**

- **auth/login:** Implementar alguna de las estrategias de autenticación disponibles en passport para permitir el login con Facebook y Gmail.

- **Custom item:** Posibilidad de agregar características seleccionables al producto (ej: talla, color, etc). La customización no debería modificar el precio.

  Las selecciones serán detalladasen el checkout. Por ejemplo: **1x camisa (roja) $200** y **2 x camisa (verde) $400**

- Stock check: Validar stock al momento de intentar generar la **orden**

- **Mis órdenes:** El usuario podrá visualizar todas las órdenes que realizó a través de la ruta **/orden**

---

## No es necesario, ni recomendado:

---

- Crear un administrador de stock, dado que puede escaparse del scope y requerir bastante trabajo extra. Podremos gestionar el stock desde la base MongoDB.

- Implementar el FrontEnd salvo que así sea deseado por parte del estudiante
