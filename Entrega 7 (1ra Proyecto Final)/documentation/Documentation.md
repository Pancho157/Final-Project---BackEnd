# PROGRAMACION BACKEND

# Comisión #32095

# Desafio 7 (1ra Entrega del Proyecto Final)

# Observaciones

- Es posible que necesite reiniciar el servidor para poder pasar de una prueva a otra al rechazar las conexiones

- El id en la generación de productos se reiniciará a 1 cuando se reinicie el servidor (Implemente esto debido a querer comprender mejor como funcionan las variables estáticas dentro de las clases)

---
## Link a gliph.com
---
- [Página de Glitch.com](https://entrega-parcial---proyecto-final.glitch.me)
- [Código en Glitch.com](https://glitch.com/edit/#!/entrega-parcial---proyecto-final)
---

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

<img src="./assets/GET - api_productos.gif" width=1500px/>

---

    POST --> /api/productos

    (Solo para administradores)

- En caso de no ser administrador el servidor enviará un status 401 y el siguiente mensaje:

        {
            error: "-1",
            descripción: `ruta /api/productos - método POST - no autorizada`,
        }

- POST --> /api/productos --> Intenta generar un nuevo producto, para lo cual hay que enviar información (utilizando el body de la request) con la siguiente estructura:

        {
            "title": "Nombre del producto",
            "price": 200,
            "thumbnail": "URL",
            "description": "Descripción del producto",
            "stock": 11
        }

  - En caso de no rellenar alguno de los campos el servidor no generará el producto y enviará un status 400 y el siguiente mensaje: "No se rellenaron todos los campos requeridos"

  - En caso de existir un producto con el mismo nombre el servidor enviará un status 400 y el siguiente mensaje: "Ya existe el producto ingresado"

<img src="./assets/POST - api_productos.gif" width=1500px/>

---

    PUT --> /api/productos/:id

    (Solo para administradores)

- En caso de no ser administrador el servidor enviará un status 401 y el siguiente mensaje:

        {
            error: "-1",
            descripción: `ruta /api/productos/:id - método PUT - no autorizada`,
        }

- PUT --> /api/productos/:id --> Intenta actualizar un producto, para lo cual hay que enviar alguno de los parametros especificados debajo (utilizando el body de la request):

        {
            "title": "Nombre del producto",
            "price": 200,
            "thumbnail": "URL",
            "description": "Descripción del producto",
            "stock": 11
        }

  - En caso de no rellenar al menos uno de los campos el servidor no actaulizará el producto y enviará un status 400 y el siguiente mensaje: "No se envió información para actualizar el producto"

  - En caso de no encontrar un producto con el id enviado mediante params el servidor enviará un status 400 y el siguiente mensaje: "No se encontró un producto con el ID ingresado ( ${id} )"

<img src="./assets/PUT - api_productos.gif" width=1500px/>

---

    DELETE --> /api/productos/:id

    (Solo para administradores)

- En caso de no ser administrador el servidor enviará un status 401 y el siguiente mensaje:

        {
            error: "-1",
            descripción: `ruta /api/productos/:id - método DELETE - no autorizada`,
        }

- DELETE --> /api/productos/:id --> Intenta eliminar un producto con el id enviado por params

  - En caso de no encontrar un producto con el id enviado mediante params el servidor enviará un status 400 y el siguiente mensaje: "Error al borrar: No se encontró el id ingresado (${id})"

  - En caso de tener un error al guardar nuevamente los productos (sin el eliminado) el servidor enviará un status 400 y el siguiente mensaje: "Error al guardar: No fue posible eliminar el producto (${id})"

  - En caso de no poder traer los productos para eliminar el producto con el id especificado por params, el servidor enviará un status 400 y el siguiente mensaje: "Error al traer los productos: ${Error}"

<img src="./assets/DELETE - api_productos.gif" width=1500px/>

---

---

                                                /api/carrito

---

---

    POST --> /api/carrito

- POST --> /api/carrito --> Intenta generar un nuevo carrito a partir de una plantilla creada con clases y devuelve el siguiente mensaje: "Se guardó el carrito con el id: ${cartId}"

  - No es necesario enviar información en el body de la request

  - En caso de haber un error al guardar el carrito en el archivo, servidor enviará un status 400 con el siguiente mensaje: "Error al guardar el carrito: ${err}"

<img src="./assets/POST - api_carrito.gif" width=1500px/>

---

    DELETE --> /api/carrito/:id

- DELETE --> /api/carrito/:id --> Intenta eliminar el carrito con el id enviado por params

  - En caso de éxito devuelve el siguiente mensaje: "Se eliminó el carrito con el id: ${id}"

  - En caso de haber un error al guardar el nuevo array (sin incluir el carrito a eliminar), el servidor enviará un status 500 con el siguiente mensaje: "Error al eliminar el carrito: ${Error}"

  - En caso de no encontrar un carrito con el id especificado mediante params el servidor enviará un status 400 con el siguiente mensaje: "No se ha encontrado un carrito con el ID = ${id}"

<img src="./assets/DELETE - api_carrito_id.gif" width=1500px/>

---

    GET --> /api/carrito/:id/productos

- GET --> /api/carrito/:id/productos --> Devuelve los productos de un carrito

  - En caso de éxito devuelve un array con todos los productos almacenados en un carrito

  - En caso de no encontrar un carrito con el id especificado mediante params, el servidor enviará un status 400 con el siguiente mensaje: "No se encontró el carrito con el ID = ${id}"

  - En caso de haber un error al traer los carritos para buscar el carrito en particular el seervidor enviará un status 500 y el mensaje: "UPS: Hubo un error ${err}"

<img src="./assets/GET - api_carrito_id_productos.gif" width=1500px/>

---

    POST --> /api/carrito/:id/productos

- POST --> /api/carrito/:id/productos --> Intenta agregar un producto (especificado por el id del producto en el body de la request) al carrito especificado por params

  - En caso de éxito el servidor enviará el siguiente mensaje: "Se agregó el producto con el id: {productId} al carrito con id: ${cartId}"

  - En caso de no encontrar el producto con el id especificado el servidor enviará un status 400 con el mensaje: "Error al encontrar el producto con el id: ${productId}"

  - En caso de no encontrar el carrito con el id especificado el servidor enviará un status 400 con el mensaje: "No se encontró el carrito con el ID = ${cartId}"

  - En caso de haber un error al guardar el producto en el carrito el servidor enviará un status 400 con el mensaje: "Error al agregar el producto al carrito: ${Error}"

<img src="./assets/POST - api_carrito_id_productos.gif" width=1500px/>

---

    DELETE --> /api/carrito/:id/productos/:id_prod

- DELETE --> /api/carrito/:id/productos/:id_prod --> Intenta eliminar un producto (especificado por el id del producto en el body de la request) del carrito especificado por params

  - En caso de éxito el servidor enviará el siguiente mensaje: "Se eliminó el producto con el id: ${id_prod} al carrito con id: ${id}"

  - En caso de no encontrar el producto con el id especificado dentro del carrito el servidor enviará un status 400 con el mensaje: "Error al encontrar el producto con el id: ${productId}"

  - En caso de no encontrar el carrito con el id especificado el servidor enviará un status 400 con el mensaje: "No se encontró el carrito con el ID = ${cartId}"

  - En caso de haber un error al guardar el producto en el carrito el servidor enviará un status 400 con el mensaje: "Error al eliminar el producto al carrito: ${Error}"

<img src="./assets/DELETE - api_carrito_id_productos_idProd.gif" width=1500px/>
