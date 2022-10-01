# PROGRAMACION BACKEND

# Comisión #32095

# Desafio 10 (2da Entrega del Proyecto Final)

---

## Observaciones:

---

- En caso de que el usuario quiera realizar una acción para la cual no está autorizado:

(Sin bien no va al caso, ya que en realidad lo da un middleware, es bueno tenerlo con los errores)

    `{ error: -1, errorStatus: 401, descripción: "ruta ${req.url} método ${req.method} no implementada"}`

- El mensaje para un mismo código de error puede variar, ya que son para casos generales

EJemplo:

`{error: -22, errorStatus: 401, message: "No se ha encontrado la collección de los carritos"}`

`{error: -22, errorStatus: 401, message: "No se ha encontrado el producto deseado"}`

Ambos poseen el código de error -22, pero poseen diferente mensaje

Sin embargo ambos apuntan al mismo tipo de error, uno de busqueda

---

## Timpos de errores para los DAO

---

- Errores del servidor:

`{error: -10, errorStatus: 500, message: "No se ha encontrado la BBDD requerida"}`

`{error: -11, errorStatus: 500, message: "Error de generación"}`

- Errores de petición:

`{error: -20, errorStatus: 400, message: "No se ingresaron todos los campos necesarios"}`

`{error: -21, errorStatus: 400, message: "Los valores ingresados son del tipo incorrecto"}`

`{error: -22, errorStatus: 400, message: "No se ha encontrado el producto deseado"}`
