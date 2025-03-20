
let products = [];
let orders = [];
let cart = {};
let users = [];
let user = {};
let total = 0;

function initApp() {
  // Start with the login screen.
  showLogin();
}
const addToCart = (id) => {
  if (!cart[id]) cart[id] = 1;
  else cart[id]++;
  showCart();
};

const increment = (id) => {
  cart[id] += 1;
  showCart();
};

const decrement = (id) => {
  cart[id] -= 1;
  if (cart[id] < 1) delete cart[id];
  showCart();
};

const showTotal = () => {
  total = products.reduce((sum, product) => {
    return sum + product.price * (cart[product.id] ? cart[product.id] : 0);
  }, 0);
  document.getElementById("divtotal").innerHTML = "$" + total;
};

const showCart = () => {
  let str = "";
  products.forEach((product) => {
    if (cart[product.id]) {
      str += `
        <li>
          <img src="${product.url}" alt="${product.name}" />
          <div>
            <strong>${product.name}</strong> - $${product.price}<br>
            <button onclick="decrement(${product.id})">-</button>
            ${cart[product.id]}
            <button onclick="increment(${product.id})">+</button>
            = ${product.price * cart[product.id]}
          </div>
        </li>
      `;
    }
  });
  document.getElementById("divCart").innerHTML = str;
  document.getElementById("item").innerHTML = Object.keys(cart).length;
  showTotal();
};

const displayCart = () => {
  document.getElementById("divcartblock").style.left = "80%";
};

const hideCart = () => {
  document.getElementById("divcartblock").style.left = "100%";
};

const placeOrder = () => {
  // Create a copy of the cart to store in the order.
  const order = {
    customer: user.email,
    items: { ...cart },
    orderValue: total,
    status: "pending",
  };
  orders.push(order);
  cart = {};
  showCart();
  hideCart();
  showOrders();
};

/* ---------- ORDER & MAIN PAGE ---------- */
const showOrders = () => {
  let str = `<h3>My Orders</h3>`;
  orders.forEach((order) => {
    if (order.customer === user.email) {
      str += `
        <div class="order">
          <p>Customer: ${order.customer}</p>
          <p>Order Value: $${order.orderValue}</p>
          <p>Items Count: ${Object.keys(order.items).length}</p>
          <p>Status: ${order.status}</p><br>
        </div>
      `;
    }
  });
  document.getElementById("divProducts").innerHTML = str;
};

const showProducts = () => {
  let str = "<div class='row'>";
  products.forEach((product) => {
    str += `
      <div class="box">
        <img src="${product.url}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.des}</p>
        <h4>$${product.price}</h4>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
  str += "</div>";
  document.getElementById("divProducts").innerHTML = str;
};

const loadProducts = () => {
  // Fetch products from products.json (which uses new properties)
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      products = data;
      showProducts();
    })
    .catch((err) => console.error(err));
};

const showMain = () => {
  let str = `
    <div class="con">
      <div class="header">
        <h1>
        HEAVENLY HOME 
        </h1>
        <ul class="menu">
          <li onclick="showProducts()">Home</li>
          <li onclick="showOrders()">Orders</li>
          <li onclick="displayCart()">Cart: <span id="item">${Object.keys(cart).length}</span></li>
          <li onclick="showLogin()">Logout</li>
        </ul>
      </div>
      <div class="productBlock">
        <div id="divProducts"></div>
      </div>
      <div id="divcartblock" class="cartBlock">
        <h3>My Cart</h3>
        <ul id="divCart"></ul>
        <h3>Total Amount</h3>
        <div id="divtotal"></div>
        <button onclick="placeOrder()">Place Order</button>
        <button onclick="hideCart()">Close</button>
      </div>
    </div>
  `;
  document.getElementById("root").innerHTML = str;
  loadProducts();
};

/* ---------- LOGIN & REGISTRATION ---------- */
function showLogin() {
  let str = `
    <div class="login">
      <h2>Login Form</h2>
      <div id="msg"></div>
      <p><input id="email" type="text" placeholder="Email"></p>
      <p><input id="password" type="password" placeholder="Password"></p>
      <button onclick="chkUser()">Log In</button>
      <p>Not a member? <button onclick="showForm()">Create Account</button></p>
    </div>
  `;
  document.getElementById("root").innerHTML = str;
}

function showForm() {
  let str = `
    <div class="registration">
      <h2>Registration Form</h2>
      <p><input type="text" id="name" placeholder="Name"></p>
      <p><input type="text" id="email" placeholder="Email"></p>
      <p><input type="password" id="password" placeholder="Password"></p>
      <p><input type="date" id="dob"></p>
      <p><button onclick="addUser()">Submit</button></p>
      <p>Already a member? <button onclick="showLogin()">Login Here</button></p>
    </div>
  `;
  document.getElementById("root").innerHTML = str;
}

function chkUser() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let found = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      user = users[i];
      found = true;
      break;
    }
  }
  if (found) {
    showMain();
  } else {
    document.getElementById("msg").innerHTML = "Access Denied";
  }
}

function addUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let newUser = { name, email, password, dob, balance: 0 };
  users.push(newUser);
  showLogin();
}
