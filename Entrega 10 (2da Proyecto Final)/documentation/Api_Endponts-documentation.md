# PROGRAMACION BACKEND

# Comisión #32095

# Desafio 10 (2da Entrega del Proyecto Final)

# Funcionamiento de los diferentes endpoints

---

                                                Mensaje 404
    {
        error: -2,
        descripción: `ruta ${req.url} método ${req.method} no implementada`,
    }

---

---

                                                /api/productos

---

---

    GET --> /api/productos/all
    GET --> /api/productos/:id

- GET --> /api/productos/all --> Trae todos los productos

- GET --> /api/productos/:id --> Trae un producto en específico (en caso de no encontrarlo devuelve un status 400 y el siguiente mensaje: No se ha encontrado el producto que estás buscando)

## Errores que retorna

- En caso de haber un error al buscar la BBDD:

  - `{error: -10, errorStatus: 500, message: "No se ha encontrado la BBDD deseada"}`

- En caso de ingresar no ingresar el id:

  - `{error: -20, errorStatus: 400, message: "No se ha ingresado ningún ID de producto"}`

- En caso de haber ingresado el ID con el tipo de dato incorrecto:

  - `{error: -21, errorStatus: 400, message: "Los datos ingresados son válidos (id = int)"}`

- En caso de haber un error al buscar el producto:

  - `{error: -22, errorStatus: 400, message: "No se ha encontrado el producto deseado"}`

---

    POST --> /api/productos

    (Solo para administradores)

- POST --> /api/productos --> Intenta generar un nuevo producto, para lo cual hay que enviar información (utilizando el body de la request) con la siguiente estructura:

        {
            "title": "Nombre del producto",
            "price": 200,
            "thumbnail": "URL",
            "description": "Descripción del producto",
            "stock": 11
        }

## Errores que retorna

- En caso de no ser administrador el servidor enviará un status 401 y el siguiente mensaje:

        {
            error: "-1",
            descripción: `ruta /api/productos - método POST - no autorizada`,
        }

- En caso de no poder encontrar la BBDD:

  - `{error: -10, errorStatus: 500, message: "No se ha encontrado la BBDD requerida"}`

- En caso de haber un error al generar el producto:

  - `{error: -11, errorStatus: 500, message: "Ha ocurrido un error al generar el producto: ${err}"}`

- En caso de no haber ingresado todas las propiedades necesarias del nuevo producto:

  - `{error: -20, errorStatus: 400, message: "No ingresaron todos los campos necesarios (title, price, thumbnail, stock)"}`

- En caso de haber ingresado una o más propiedades con el tipo de dato incorrecto:
  - `{error: -21, errorStatus: 400, message: "No todos los datos ingresados son válidos (title = string, price = int, thumbnail = string, stock = int)"}`

---

    PUT --> /api/productos/:id

    (Solo para administradores)

- PUT --> /api/productos/:id --> Intenta actualizar un producto, para lo cual hay que enviar alguno de los parametros especificados debajo (utilizando el body de la request):

        {
            "title": "Nombre del producto",
            "price": 200,
            "thumbnail": "URL",
            "description": "Descripción del producto",
            "stock": 11
        }

## Errores que retorna

- En caso de no ser administrador el servidor enviará un status 401 y el siguiente mensaje:

        {
            error: "-1",
            descripción: `ruta /api/productos/:id - método PUT - no autorizada`,
        }

- En caso de no haber ingresado los datos necesarios:

  - `{error: -20, errorStatus: 400, message: "No ingresaron todos los campos necesarios(id - y por lo menos uno de los siguientes: title, price, thumbnail, stock)"}`

- En caso de haber ingresado una o más propiedades con el tipo de dato incorrecto:

  - `{error: -21, errorStatus: 400, message: "No todos los datos ingresados son válidos (id = int, title = string, price = int, thumbnail = string, stock = int)"}`

- En caso de haber un error al buscar la BBDD:

  - `{error: -10, errorStatus: 500, message: "No se ha encontrado la BBDD deseada"}`

---

    DELETE --> /api/productos/:id

    (Solo para administradores)

- DELETE --> /api/productos/:id --> Intenta eliminar un producto con el id enviado por params

## Errores que retorna

- En caso de no ser administrador el servidor enviará un status 401 y el siguiente mensaje:

        {
            error: "-1",
            descripción: `ruta /api/productos/:id - método DELETE - no autorizada`,
        }

- En caso de ingresar no ingresar el id:

  - `{error: -20, errorStatus: 400, message: "No se ha ingresado ningún ID de producto"}`

- En caso de haber ingresado una o más propiedades con el tipo de dato incorrecto:

  - `{error: -21, errorStatus: 400, message: "Los datos ingresados son válidos (id = int)"}`

- En caso de haber un error al buscar el producto:

  - `{error: -22, errorStatus: 400, message: "No se ha encontrado el producto deseado"}`

---

                                                /api/carrito

---

---

    POST --> /api/carrito

- POST --> /api/carrito --> Intenta generar un nuevo carrito a partir de una plantilla creada con clases y devuelve el siguiente mensaje: "Se guardó el carrito con el id: ${cartId}"

  - No es necesario enviar información en el body de la request

## Errores que retorna

- En caso de no encontrar la BBDD:

  - `{error: -10, errorStatus: 500, message: "No se ha encontrado la BBDD requerida"}`

- En caso de haber un error al generar el carrito:

  - `{error: -11, errorStatus: 500, message: "Error de generación"}`

---

    DELETE --> /api/carrito/:id

- DELETE --> /api/carrito/:id --> Intenta eliminar el carrito con el id enviado por params

  - En caso de éxito devuelve el siguiente mensaje: "Se eliminó el carrito con el id: ${id}"

## Errores que retorna

- En caso de no encontrar la BBDD:

  - `{error: -10, errorStatus: 500, message: "No se ha encontrado la BBDD requerida"}`

- En caso de no ingresar el ID:

  - `{error: -20, errorStatus: 400, message: "No se ingresaron todos los campos necesarios"}`

En caso de que el ID sea del tipo incorrecto:

- `{error: -21, errorStatus: 400, message: "Los valores ingresados son del tipo incorrecto"}`

- En caso de no encontrar el producto con el ID especificado:

  - `{error: -22, errorStatus: 400, message: "No se ha encontrado el producto deseado"}`

---

    GET --> /api/carrito/:id/productos

- GET --> /api/carrito/:id/productos --> Devuelve los productos de un carrito

  - En caso de éxito devuelve un array con todos los productos almacenados en un carrito

## Errores que retorna

- En caso de no encontrar la BBDD del carrito:

  - `{error: -10, errorStatus: 500, message: "No se ha encontrado la BBDD requerida"}`

- En caso de no encontrar el carrito:

  - `{error: -22, errorStatus: 400, message: "No se ha encontrado el carrito"}`

- En caso de no ingresar el id:

  - `{error: -20, errorStatus: 400, message: "No se ingresó el id del carrito"}`

- En caso de que el id sea de tipo incorrecto:

  - `{error: -21, errorStatus: 400, message: "Los valores ingresados son del tipo incorrecto"}`

---

    POST --> /api/carrito/:id/productos

- POST --> /api/carrito/:id/productos --> Intenta agregar un producto (especificado por el id del producto en el body de la request) al carrito especificado por params

  - En caso de éxito el servidor enviará el siguiente mensaje: "Se agregó el producto con el id: {productId} al carrito con id: ${cartId}"

## Errores que retorna

- En caso de no encontrar el carrito:

  - `{error: -22, errorStatus: 400, message: "No se ha encontrado el carrito deseado"}`

- En caso de no encontrar el ID del producto:

  - `{error: -22, errorStatus: 400, message: "No se ha encontrado el producto con el id especificado"}`

- En caso de faltar alguno de los id:

  - `{error: -20, errorStatus: 400, message: "No se ingresaron todos los campos necesarios"}`

- En caso de que uno o ambos id sean del tipo incorrecto:

  - `{error: -21, errorStatus: 400, message: "Los valores ingresados son del tipo incorrecto"}`

---

    DELETE --> /api/carrito/:id/productos/:id_prod

- DELETE --> /api/carrito/:id/productos/:id_prod --> Intenta eliminar un producto (especificado por el id del producto en el body de la request) del carrito especificado por params

  - En caso de éxito el servidor enviará el siguiente mensaje: "Se eliminó el producto con el id: {id_prod} al carrito con id: {id}"

## Errores que retorna

- En caso de no encontrar el carrito:

  - `{error: -22, errorStatus: 400, message: "No se ha encontrado el carrito deseado"}`

- En caso de no encontrar el ID del producto dentro del carrito:

  - `{error: -22, errorStatus: 400, message: "No se ha encontrado el producto dentro del carrito"}`

- En caso de faltar alguno de los id:

  - `{error: -20, errorStatus: 400, message: "No se ingresaron todos los campos necesarios"}`

- En caso de que uno o ambos id sean del tipo incorrecto:

  - `{error: -21, errorStatus: 400, message: "Los valores ingresados son del tipo incorrecto"}`
