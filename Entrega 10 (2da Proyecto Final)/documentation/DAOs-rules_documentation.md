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

## Outputs

- En caso de éxito:

  - ID del nuevo producto

- En caso de haber un error al generar el producto:

  - `{error: -1, errorStatus: 500, message: "Ha ocurrido un error al generar el producto: ${err}"}`

- En caso de no haber ingresado todas las propiedades en el objeto:

  - `{error: -2, errorStatus: 401, message: "No ingresaron todos los campos necesarios(id, title, price, thumbnail, stock)"}`

- En caso de haber ingresado una o más propiedades con el tipo de dato incorrecto:
  - `{error: -3, errorStatus: 401, message: "No todos los datos ingresados son válidos(id = int, title = string, price = int, thumbnail = string, stock = int)"}`

---

                    getById(id) {}

## Inputs

    id = int

## Outputs

- En caso de éxito:

  - Objeto con todas las propiedades del producto

        {
            "id": int,
            "title": "",
            "price": int,
            "thumbnail": "",
            "stock": int
        }

- En caso de haber un error al buscar el producto:

  - `{error: -4, errorStatus: 401, message: "No se ha encontrado el producto deseado"}`

- En caso de ingresar no ingresar el id:

  - `{error: -5, errorStatus: 401, message: "No se ha ingresado ningún ID de producto"}`

- En caso de haber ingresado una o más propiedades con el tipo de dato incorrecto:
  - `{error: -3, errorStatus: 401, message: "Los datos ingresados son válidos (id = int)"}`

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
                "title": "",
                "price": int,
                "thumbnail": "",
                "stock": int
            },
            {
                "id": int,
                "title": "",
                "price": int,
                "thumbnail": "",
                "stock": int
            }
        ]

- En caso de haber un error al buscar la BBDD:
  - `{error: -6, errorStatus: 500, message: "No se ha encontrado la BBDD deseada"}`

---

                    deleteById(id) {}

## Inputs

    id = int

## Outputs

- En caso de éxito:

  - Devuelve un mensaje diciendo lo siguiente: "Se eliminó exitosamente el producto con id = {id}"

- En caso de haber un error al buscar el producto:

  - `{error: -4, errorStatus: 401, message: "No se ha encontrado el producto deseado"}`

- En caso de ingresar no ingresar el id:

  - `{error: -5, errorStatus: 401, message: "No se ha ingresado ningún ID de producto"}`

- En caso de haber ingresado una o más propiedades con el tipo de dato incorrecto:
  - `{error: -3, errorStatus: 401, message: "Los datos ingresados son válidos (id = int)"}`

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

- En caso de haber un error al modificar el producto:

  - `{error: -6, errorStatus: 500, message: "Ha ocurrido un error al modificar el producto: ${err}"}`

- En caso de no haber ingresado los datos necesarios:

  - `{error: -2, errorStatus: 401, message: "No ingresaron todos los campos necesarios(id - y por lo menos uno de los siguientes: title, price, thumbnail, stock)"}`

- En caso de haber ingresado una o más propiedades con el tipo de dato incorrecto:

  - `{error: -3, errorStatus: 401, message: "No todos los datos ingresados son válidos (id = int, title = string, price = int, thumbnail = string, stock = int)"}`

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

            [
                {
                    cartId: int,
                    timestamp: {
                        date: "string"
                        time: "string"
                    }
                    cartProducts: []
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
