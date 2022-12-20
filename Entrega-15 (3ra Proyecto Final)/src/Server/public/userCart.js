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

  return JSON.parse(response);
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

  return JSON.parse(response);
}

/* ------------------ Carts functions ------------------ */

// -------- Delete methods ----------
async function removeProductFromCart(productId) {
  const url = "http://localhost:8080/api/carts/deleteProduct";
  const data = { id: productId };

  try {
    const response = await deleteData(url, data);

    location.reload();
  } catch (err) {
    alert("Lo sentimos, ha ocurrido un error");
  }
}

async function removeOneUnitFromCartProduct(productId) {
  const url = "http://localhost:8080/api/carts";
  const data = { productId: productId };

  try {
    const response = await deleteData(url, data);

    location.reload();
  } catch (err) {
    alert("Lo sentimos, ha ocurrido un error");
  }
}

// -------- Post methods ----------

async function addProductToCart(porductId) {
  const url = "http://localhost:8080/api/carts";
  const data = { id: productId };

  try {
    const response = await postData(url, data);
  } catch (err) {
    alert("Lo sentimos, ha ocurrido un error");
  }
}

async function buyUserCart() {
  const url = "http://localhost:8080/api/carts/buyCart";
  const data = {};

  try {
    const response = await postData(url, data);
  } catch (err) {
    alert("Lo sentimos, ha ocurrido un error");
  }
}
