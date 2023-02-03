# Product structure

---

    {
        "_id": String,
        "title": String,
        "thumbnail": String,
        "category": String
        "price": Int,
        "stock": Int,
    }

---

# Products quieries

---

## GET

---

        GET - http://localhost:8080/productos

Devuelve un array con todos los productos

        GET - http://localhost:8080/productos/:id

Devuelve el producto con el id especificado

El id es el asignado por MongoDB

        GET - http://localhost:8080/productos/:category/categoria

Devuelve un array con todos los productos que concuerden con la categoría solicitada

---

## POST

---

        POST - http://localhost:8080/productos

Genera un nuevo producto, siempre y cuando se le pasen los siguientes parámetros mediante el body de la request

    {
        "title": String,
        "thumbnail": String,
        "category": String,
        "price": Int,
        "stock": Int,
    }

---

## PUT

---

        PUT - http://localhost:8080/productos

Actualiza un producto, siempre y cuando se le pase el id del producto y alguna propiedad dentro del body de la request

Ejemplo: { "id": String, "title": String }

---

## DELETE

---

        PUT - http://localhost:8080/productos/:id

Elimina un producto (siempre y cuando el producto espesificado exista) y devuelve la siguiente respuesta en caso de éxito:

{
"acknowledged": true,
"deletedCount": 1
}
