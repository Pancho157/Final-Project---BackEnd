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

// -------- Render products on cart table ----------
function renderProductsOnCart(products = []) {
  const tableBody = document.getElementById("cartTable__body");
  const cartTotal = document.querySelector("cart__total-to-pay");
  let total = 0;

  tableBody.innerHTML = "";
  cartTotal.innerHTML = "";

  products.forEach((product) => {
    total += product.quantity * product.price;
    tableBody.innerHTML += `
        <tr class="table__tr">
        <td class="table__td"><img src=${products.thumbnail} /></td>
        <td class="table__td">${product.title}</td>
        <td class="table__td table__td--quantity">${product.quantity}
          <div class="addRemoveButtonsContainer">
            <button
              class="cartAddButton"
              onclick="removeOneUnitFromCartProduct(${_id})"
            >+</button>
            <button
              class="cartRemoveOneFromProduct"
              onclick="addProductToCart(${_id})"
            >-</button>
          </div>
        </td>
        <td class="table__td">${product.price}</td>
        <td class="table__td">${product.unitaryPrice}</td>
        <td class="table__td">
          <button
            class="cartDeleteButton"
            onclick="removeProductFromCart(${_id})"
          ></button>
        </td>
      </tr>
    `;
  });

  cartTotal.innerHTML = `Total: ${total}`;
}

// *------------------------------------------------------------------*
//                            API Querys
// *------------------------------------------------------------------*

// -------- Delete methods ----------
async function removeProductFromCart(productId) {
  const url = "http://localhost:8080/api/carts/deleteProduct";
  const data = { id: productId };

  try {
    const response = await deleteData(url, data);
    renderProductsOnCart(response);
  } catch (err) {
    alert("Lo sentimos, ha ocurrido un error");
  }
}

async function removeOneUnitFromCartProduct(productId) {
  const url = "http://localhost:8080/api/carts";
  const data = { productId: productId };

  try {
    const response = await deleteData(url, data);
    renderProductsOnCart(response);
  } catch (err) {
    alert("Lo sentimos, ha ocurrido un error");
  }
}

// -------- Post methods ----------

async function addProductToCart(productId) {
  const url = "http://localhost:8080/api/carts";
  const data = { id: productId };

  try {
    const response = await postData(url, data);
    renderProductsOnCart(response);
  } catch (err) {
    alert("Lo sentimos, ha ocurrido un error");
  }
}

async function buyUserCart() {
  const url = "http://localhost:8080/api/carts/buyCart";
  const data = {};

  try {
    const response = await postData(url, data);
    renderProductsOnCart(response);
  } catch (err) {
    alert("Lo sentimos, ha ocurrido un error");
  }
}
