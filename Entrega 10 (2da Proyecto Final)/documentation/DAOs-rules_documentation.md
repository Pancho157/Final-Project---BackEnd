# PROGRAMACION BACKEND

# Comisión #32095

# Desafio 10 (2da Entrega del Proyecto Final)

# Requisitos para los DAO

---

                                Observaciones

---

- Todos los métodos de los diferentes DAO son asincrónicos

- El metodo de almacenamiento se ve decidido por un Switch (que utiliza una variable de ambiente)

---

                                Productos DAO - Métodos y errores

---

---

                    save(newObject) {}

## Inputs

- Donde newObject es un objeto con las propiedades:

        {
            "id": int,
            "title": "",
            "price": int,
            "thumbnail": "",
            "stock": int
        }

- El DAO debe generar a su vez de manera automática dos propiedades para el nuevo producto:

      "code": "",
      "timestamp": { "date": "DD/MM/YYYY", "time": "HH:MM:SS" }

## Outputs

- En caso de éxito:

  - ID del nuevo producto

- En caso de no poder encontrar la BBDD:

  - `{error: -10, errorStatus: 500, message: "No se ha encontrado la BBDD requerida"}`

- En caso de haber un error al generar el producto:

  - `{error: -11, errorStatus: 500, message: "Ha ocurrido un error al generar el producto: ${err}"}`

- En caso de no haber ingresado todas las propiedades necesarias del nuevo producto:

  - `{error: -20, errorStatus: 400, message: "No ingresaron todos los campos necesarios (id, title, price, thumbnail, stock)"}`

- En caso de haber ingresado una o más propiedades con el tipo de dato incorrecto:
  - `{error: -21, errorStatus: 400, message: "No todos los datos ingresados son válidos (id = int, title = string, price = int, thumbnail = string, stock = int)"}`

---

                    getById(id) {}

## Inputs

    id = int

## Outputs

- En caso de éxito:

  - Objeto con todas las propiedades del producto

        {
            "id": int,
            "code": "",
            "timestamp": { "date": "DD/MM/YYYY", "time": "HH:MM:SS" }
            "title": "",
            "price": int,
            "thumbnail": "",
            "stock": int
        }

- En caso de ingresar no ingresar el id:

  - `{error: -20, errorStatus: 400, message: "No se ha ingresado ningún ID de producto"}`

- En caso de haber ingresado una o más propiedades con el tipo de dato incorrecto:

  - `{error: -21, errorStatus: 400, message: "Los datos ingresados son válidos (id = int)"}`

- En caso de haber un error al buscar el producto:

  - `{error: -22, errorStatus: 400, message: "No se ha encontrado el producto deseado"}`

---

                    getAll() {}

## Inputs

    No requiere, solo se debe llamar al método

## Outputs

- En caso de éxito:

  - Array de objetos (cada uno representa un producto)

        [
            {
                "id": int,
                "code": "",
                "timestamp": { "date": "DD/MM/YYYY", "time": "HH:MM:SS" }
                "title": "",
                "price": int,
                "thumbnail": "",
                "stock": int
            },
            {
                "id": int,
                "code": "",
                "timestamp": { "date": "DD/MM/YYYY", "time": "HH:MM:SS" }
                "title": "",
                "price": int,
                "thumbnail": "",
                "stock": int
            }
        ]

- En caso de haber un error al buscar la BBDD:

  - `{error: -10, errorStatus: 500, message: "No se ha encontrado la BBDD deseada"}`

---

                    deleteById(id) {}

## Inputs

    id = int

## Outputs

- En caso de éxito:

  - Devuelve un mensaje diciendo lo siguiente: `Se eliminó exitosamente el producto con id = {id}`

- En caso de ingresar no ingresar el id:

  - `{error: -20, errorStatus: 400, message: "No se ha ingresado ningún ID de producto"}`

- En caso de haber ingresado una o más propiedades con el tipo de dato incorrecto:

  - `{error: -21, errorStatus: 400, message: "Los datos ingresados son válidos (id = int)"}`

- En caso de haber un error al buscar el producto:

  - `{error: -22, errorStatus: 400, message: "No se ha encontrado el producto deseado"}`

---

                    update(id, newInfo) {}

## Inputs

- Donde newInfo es un objeto con las propiedades e id es un interger:

        id = int

        newInfo = {
            "id": int,
            "title": "",
            "price": int,
            "thumbnail": "",
            "stock": int
        }

## Outputs

- En caso de éxito:

  - Devuelve un mensaje diciendo lo siguiente: "Se modifico exitosamente el producto con id = {id}"

- En caso de no haber ingresado los datos necesarios:

  - `{error: -20, errorStatus: 400, message: "No ingresaron todos los campos necesarios(id - y por lo menos uno de los siguientes: title, price, thumbnail, stock)"}`

- En caso de haber ingresado una o más propiedades con el tipo de dato incorrecto:

  - `{error: -21, errorStatus: 400, message: "No todos los datos ingresados son válidos (id = int, title = string, price = int, thumbnail = string, stock = int)"}`

- En caso de haber un error al buscar la BBDD:

  - `{error: -10, errorStatus: 500, message: "No se ha encontrado la BBDD deseada"}`

---

---

                                Carritos DAO - Métodos y errores

---

---

                    getCarts() {}

## Inputs

    No requiere, solo se debe llamar al método

## Outputs

- En caso de éxito:

  - Devuelve un array de objets, los cuales representan a cada carrito

    (Se guardan los id de los productos debido a que pueden modificarse luego y los carritos no se enterarian si se guardara toda la info del producto)

            [
                {
                    cartId: int,
                    timestamp: {
                        date: "string"
                        time: "string"
                    }
                    cartProducts: [prodId, prodId, prodId]
                },
                {
                    cartId: int,
                    timestamp: {
                        date: "string"
                        time: "string"
                    }
                    cartProducts: []
                }
            ]

- En caso de haber un error al buscar los carritos:

  - `{error: -11, errorStatus: 500, message: "No se ha encontrado la BBDD requerida"}`

---

                    addCart() {}

## Inputs

## Outputs

---

                    deleteCartById(id) {}

## Inputs

## Outputs

---

                    getProductsFromCart(id) {}

## Inputs

## Outputs

---

                    deleteCartProductById(cartId, productId) {}

## Inputs

## Outputs

---

                    addCartProductById(cartId, productId) {}

## Inputs

## Outputs
