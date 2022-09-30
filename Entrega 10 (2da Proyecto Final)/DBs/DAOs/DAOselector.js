import CartsControllerFirebase from "./carts/CartDao-Firebase.js";

let productosDao;
let carritosDao;

switch (process.env.PERS) {
  case "firebase":
    const { default: ProductosDaoFirebase } = await import(
      "./productos/ProductosDaoFirebase.js"
    );
    const { default: CartsControllerFirebase } = await import(
      "../DAOs/carts/CartDao-Firebase"
    );

    productosDao = new ProductosDaoFirebase();
    carritosDao = new CartsControllerFirebase();
    break;
  case "mongodb":
    break;
  case "mariadb":
    break;
  case "sqlite3":
    break;
  default:
    break;
}

export { productosDao, carritosDao };
