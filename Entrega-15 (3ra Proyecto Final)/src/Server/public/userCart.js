// *------------------------------------------------------------------*
//                            Functions
// *------------------------------------------------------------------*

/* ------------------ Fetchs ------------------ */

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });

  // return JSON.parse(response);
  return response;
}

async function deleteData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });
  return response;
  // return JSON.parse(response);
}

// *------------------------------------------------------------------*
//                            API Querys
// *------------------------------------------------------------------*

// -------- Delete methods ----------
async function removeProductFromCart(productId) {
  const url = "http://localhost:8080/api/carts/deleteProduct";
  const data = { productId: productId };

  try {
    const response = await deleteData(url, data);
    location.reload();
  } catch (err) {
    location.reload();
  }
}

async function removeOneUnitFromCartProduct(productId) {
  const url = "http://localhost:8080/api/carts";
  const data = { productId: productId };

  try {
    const response = await deleteData(url, data);
    location.reload();
  } catch (err) {
    location.reload();
  }
}

// -------- Post methods ----------

async function addProductToCart(productId) {
  const url = "http://localhost:8080/api/carts";
  const data = { productId: productId };

  try {
    const response = await postData(url, data);
    location.reload();
  } catch (err) {
    location.reload();
  }
}

async function buyUserCart() {
  const url = "http://localhost:8080/api/carts/buyCart";
  const data = {};

  try {
    const response = await postData(url, data);
    response.status == 200
      ? (alert("Felicidades por tu compra!"), (window.location.href = "/"))
      : alert("Lo sentimos, ha ocurrido un error al comprar el carrito");
  } catch (err) {
    alert("Lo sentimos, ha ocurrido un error");
  }
}
